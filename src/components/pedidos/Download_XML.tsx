import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { PedidoType } from "@/types/pedido";
import { FileDown } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function DownloadXml({
    pedido
}: { pedido: PedidoType }) {

    const mutation = useMutation({
        mutationFn: async () => axios.post(`/api/coleta-xml`, {
                NUMERO: pedido.C5_NUM ,
                FILIAL: "0101"
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

        onError: (error: any) => {

            toast.dismiss();
            toast.error("Erro ao gerar XML", {
                    description: error?.response?.data?.error ??error.message,
                    duration: 3000,
                    icon: "❌",
                    style: {
                        backgroundColor: "#e53e3e",
                        color: "#fff",
                    },
                });

        }
    })

    const [urlXml, setUrlXml] = useState("")
    const [loading, setLoading] = useState(false);

    const handleXml = async () => {

        setLoading(false) 

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
    }


    return (

        <button
            onClick={handleXml}
        >

        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
          aria-label={`Download do xml`}
        >
            <FileDown className="w-6 h-6" />
        </Button>
        </button>
    )



}