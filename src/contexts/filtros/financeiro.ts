import { create } from 'zustand';

interface FiltrosFinanceiroState {
    dataInicio: Date;
    dataFim: Date;
    notaFiscal: string;
    status: string;
    setDataInicio: (dataInicio: Date) => void;
    setDataFim: (dataFim: Date) => void;
    setNotaFiscal: (notaFiscal: string) => void;
    setStatus: (status: string) => void;
    resetFiltros: () => void;
}

const now = new Date();
const dataInicioDefault = new Date(now.getFullYear(), now.getMonth(), -90);
const dataFimDefault = new Date(now.getFullYear(), now.getMonth(), 0);

export const useFiltrosFinanceiro = create<FiltrosFinanceiroState>(set => ({
    dataInicio: dataInicioDefault,
    dataFim: dataFimDefault,
    notaFiscal: '',
    status: '0',
    setDataInicio: (dataInicio: Date) => set({ dataInicio }),
    setDataFim: (dataFim: Date) => set({ dataFim }),
    setNotaFiscal: (notaFiscal: string) => set({ notaFiscal }),
    setStatus: (status: string) => set({ status }),
    resetFiltros: () =>
        set({
            dataInicio: dataInicioDefault,
            dataFim: dataFimDefault,
            notaFiscal: '',
            status: '',
        }),
}));