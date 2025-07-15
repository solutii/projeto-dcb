"use client";

import { useMutation } from "@tanstack/react-query";
import { PedidoType } from "@/types/pedido";
import { FileDown } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import api from "../axios";
import { AxiosError } from "axios";
import { useState } from "react";

export default function DownloadXml({ pedido }: { pedido: PedidoType }) {
  const mutation = useMutation({
    mutationFn: async () =>
      api.post(`/api/coleta-xml`, {
        NUMERO: pedido.C5_NUM,
        FILIAL: "0101",
      }),

    onSuccess: (retorno) => {
      toast.dismiss();
      toast.success("XML gerado com sucesso!", {
        description: "O XML do pedido foi gerado e está pronto para download.",
        duration: 3000,
        icon: "✅",
        style: {
          backgroundColor: "#38a169",
          color: "#fff",
        },
      });

      const blob = new Blob([retorno.data], { type: "application/xml" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pedido_${pedido.C5_NUM}.xml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },

    onError: (error: AxiosError) => {
      toast.dismiss();
      toast.error("Erro ao gerar XML", {
        description:
          (error?.response?.data as { error?: string })?.error ?? error.message,
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#e53e3e",
          color: "#fff",
        },
      });
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleXml = async () => {
    setLoading(false);

    toast("Xml", {
      description: "Gerando XML...",
      duration: 3000,
      icon: "⏰",
      style: {
        backgroundColor: "#38a169",
        color: "#fff",
      },
    });

    mutation.mutateAsync();
  };

  return (
    <button onClick={handleXml}>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
        aria-label={`Download do xml`}
      >
        <FileDown style={{ width: 24, height: 24 }} />
      </Button>
    </button>
  );
}
