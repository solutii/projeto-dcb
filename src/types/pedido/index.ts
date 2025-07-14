type PedidoStatusType = ' ' | '0' | '1' | '2' | '3' | '4' | '5' | '7' | '8'

const PedidoStatusLabel: { [k in PedidoStatusType]: string} = {
  " ": "Todos",
  "0": "Em Aberto",
  "1": "Encerrado",
  "2": "Liberado - Blq. Crédito/Estoque",
  "3": "Liberado - Sem Bloqueio",
  "4": "com Bloqueio de Regra",
  "5": "com Bloqueio de Verba",
  "7": "Parcialmente Faturado",
  "8": "Totalmente Faturado"
}

type PedidoType = {
    C5_NUM: string
    C5_TIPO: string
    C5_CLIENTE: string
    C5_LOJAENT: string
    C5_LOJACLI: string
    C5_CLIENT: string
    C5_CONDPAG: string
    C5_TABELA: string
    C5_MENNOTA: string
    C5_VEND1: string
    C5_EMISSAO: string
    C5_FECENT: string
    E4_DESCRI: string
    C5_FILIAL: string
    TOTAL: number
    FATURADO: number
    STATUS: string
}

type ItemPedidoType = {
    C5_FILIAL: string
    C5_NUM: string
    C6_ITEM: string
    C6_PRODUTO: string
    C6_QTDVEN: number
    C6_PRCVEN: number
    C6_VALOR: number
    C6_VALDESC: number
    B1_DESC: string
    C5_CLIENTE: string
    C5_LOJACLI: string
}

export {
    type PedidoType,
    type PedidoStatusType,
    type ItemPedidoType,
    PedidoStatusLabel
}