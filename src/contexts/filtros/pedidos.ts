import { create } from 'zustand';

interface FiltrosPedidoState {
    dataInicio: Date;
    dataFim: Date;
    numeroPedido: string;
    status: string;
    setDataInicio: (dataInicio: Date) => void;
    setDataFim: (dataFim: Date) => void;
    setNumeroPedido: (numeroPedido: string) => void;
    setStatus: (status: string) => void;
    resetFiltros: () => void;
}

const now = new Date();
const dataInicioDefault = new Date(now.getFullYear(), now.getMonth(), -90);
const dataFimDefault = new Date(now.getFullYear(), now.getMonth(), 0);

export const useFiltrosPedido = create<FiltrosPedidoState>(set => ({
    dataInicio: dataInicioDefault,
    dataFim: dataFimDefault,
    numeroPedido: '',
    status: ' ',
    setDataInicio: (dataInicio: Date) => set({ dataInicio }),
    setDataFim: (dataFim: Date) => set({ dataFim }),
    setNumeroPedido: (numeroPedido: string) => set({ numeroPedido }),
    setStatus: (status: string) => set({ status }),
    resetFiltros: () =>
        set({
            dataInicio: dataInicioDefault,
            dataFim: dataFimDefault,
            numeroPedido: '',
            status: '',
        }),
}));