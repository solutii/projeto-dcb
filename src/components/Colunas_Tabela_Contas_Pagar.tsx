import { ColumnDef } from "@tanstack/react-table";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiAdobeacrobatreader } from "react-icons/si";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export interface NotaFiscalProps {
  status: string;
  numero_nf: number;
  data_emissao: string;
  data_vencimento: string;
  valor: number;
  juros: number;
  multa: number;
}

export const colunasTabelaNotasFiscais: ColumnDef<NotaFiscalProps>[] = [
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        Status
      </div>
    ),
    cell: ({ getValue }) => {
      const status = (getValue() as string).toUpperCase();

      const configs = {
        PAGO: {
          icon: CheckCircle,
          style: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/25",
          glow: "shadow-lg shadow-emerald-500/50"
        },
        PENDENTE: {
          icon: Clock,
          style: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/25",
          glow: "shadow-lg shadow-amber-500/50"
        },
        VENCIDO: {
          icon: AlertTriangle,
          style: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/25",
          glow: "shadow-lg shadow-red-500/50"
        }
      };

      const config = configs[status as keyof typeof configs] || {
        icon: Clock,
        style: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
        glow: ""
      };

      const Icon = config.icon;

      return (
        <div className="flex justify-center">
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
            ${config.style} ${config.glow}
            transform transition-all duration-300 hover:scale-105
            backdrop-blur-sm border border-white/20
          `}>
            <Icon className="w-3 h-3" />
            {status}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "numero_nf",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        Número NF
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-3 py-1 rounded-lg font-mono text-sm font-bold border border-slate-300 dark:border-slate-600">
          #{String(getValue())}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "data_emissao",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        Data Emissão
      </div>
    ),
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const [year, month, day] = date.split("T")[0].split("-");
      return (
        <div className="text-center">
          <div className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
            {`${day}/${month}/${year}`}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "data_vencimento",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
        Data Vencimento
      </div>
    ),
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const [year, month, day] = date.split("T")[0].split("-");
      const isOverdue = new Date(date) < new Date();
      
      return (
        <div className="text-center">
          <div className={`
            font-mono text-sm font-semibold
            ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}
          `}>
            {`${day}/${month}/${year}`}
          </div>
          {isOverdue && (
            <div className="text-xs text-red-500 font-medium">Vencido</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "valor",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <TrendingUp className="w-4 h-4 text-green-500" />
        Valor
      </div>
    ),
    cell: ({ getValue }) => {
      const valor = Number(getValue()).toFixed(2);
      return (
        <div className="text-right">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent font-bold text-lg">
            R$ {valor}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "juros",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
        Juros
      </div>
    ),
    cell: ({ getValue }) => {
      const valor = Number(getValue()).toFixed(2);
      const hasJuros = Number(getValue()) > 0;
      
      return (
        <div className="text-right">
          <div className={`
            font-semibold
            ${hasJuros 
              ? 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent' 
              : 'text-gray-400 dark:text-gray-500'
            }
          `}>
            R$ {valor}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "multa",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
        Multa
      </div>
    ),
    cell: ({ getValue }) => {
      const valor = Number(getValue()).toFixed(2);
      const hasMulta = Number(getValue()) > 0;
      
      return (
        <div className="text-right">
          <div className={`
            font-semibold
            ${hasMulta 
              ? 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent' 
              : 'text-gray-400 dark:text-gray-500'
            }
          `}>
            R$ {valor}
          </div>
        </div>
      );
    },
  },
  {
    id: "acoes",
    header: () => (
      <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        Ações
      </div>
    ),
    cell: () => (
      <div className="flex justify-center gap-4">
  {/* Excel */}
  <Button 
    variant="ghost" 
    size="icon"
    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-green-100 to-green-200 dark:from-green-700 dark:to-green-600 hover:from-green-500 hover:to-green-600 transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-green-400"
  >
    <PiMicrosoftExcelLogoFill className="h-4 w-4 group-hover:text-white transition-colors duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </Button>

  {/* PDF */}
  <Button 
    variant="ghost" 
    size="icon"
    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-700 dark:to-red-600 hover:from-red-500 hover:to-red-600 transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-red-400"
  >
    <SiAdobeacrobatreader className="h-4 w-4 group-hover:text-white transition-colors duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </Button>
</div>
    ),
  },
];