"use client";

import { Header } from "@/components/Header";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";
import { FiltrosTabelaContasPagar } from "./Filtros_Tabela_Contas_Pagar";
import { CardsTabelaContasPagar } from "./Cards_Tabela_Contas_Pagar";
import { ContasPagarProps } from "./Colunas_Tabela_Contas_Pagar";

const dadosFicticios: ContasPagarProps[] = [
  {
    status: "Pendente",
    numero_nf: 10234,
    data_emissao: "2025-07-01T00:00:00Z",
    data_vencimento: "2025-07-10T00:00:00Z",
    valor: 1200.5,
    juros: 15.75,
    multa: 10.0,
  },
  {
    status: "Pago",
    numero_nf: 10235,
    data_emissao: "2025-06-15T00:00:00Z",
    data_vencimento: "2025-06-30T00:00:00Z",
    valor: 850.0,
    juros: 0,
    multa: 0,
  },
  {
    status: "Vencido",
    numero_nf: 10236,
    data_emissao: "2025-05-01T00:00:00Z",
    data_vencimento: "2025-05-10T00:00:00Z",
    valor: 1500.25,
    juros: 50.0,
    multa: 35.5,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pago",
    numero_nf: 10238,
    data_emissao: "2025-06-20T00:00:00Z",
    data_vencimento: "2025-07-01T00:00:00Z",
    valor: 950.25,
    juros: 0,
    multa: 0,
  },
];

export function LayoutContasPagar() {
  const total = dadosFicticios.length;
  const pagas = dadosFicticios.filter((n) => n.status === "Pago").length;
  const pendentes = dadosFicticios.filter(
    (n) => n.status === "Pendente"
  ).length;
  const vencidas = dadosFicticios.filter((n) => n.status === "Vencido").length;

  return (
    <main className="relative min-h-screen bg-emerald-100 overflow-x-hidden">
      {/* Header (z-10, padrão) */}
      <div className="relative z-10">
        <Header titulo="Contas a Pagar" />
      </div>

      {/* Filtros + Cards fixos com fundo branco opaco e z-30 */}
      <div className="fixed top-20 md:top-32 lg:mt-10 w-full z-30 bg-emerald-100">
        <section className="max-w-7xl mx-auto space-y-4 p-2 md:p-4 lg:p-6">
          <FiltrosTabelaContasPagar />
          <CardsTabelaContasPagar
            total={total}
            pagas={pagas}
            pendentes={pendentes}
            vencidas={vencidas}
          />
        </section>
      </div>

      {/* Área com a tabela (z-0) */}
      <div className="px-4 md:px-4 lg:p-6 max-w-7xl mx-auto relative z-0">
        <div className="mt-32 md:mt-40 lg:mt-[388px]">
          <TabelaContasPagar dados={dadosFicticios} />
        </div>
      </div>
    </main>
  );
}
