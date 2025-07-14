const ContasAPagarStatus: Record<string, string> = {
    '0': 'Título em Aberto',
    '1': 'Título em Aberto e Atrasado',
    '2': 'Título Baixado Parcialmente',
    '3': 'Título Pago'
}   

type ContasAPagarType = {
    E1_BAIXA: string
    E1_EMISSAO: string
    E1_JUROS: number 
    E1_MULTA: number
    E1_NUM: string
    E1_PARCELA: string
    E1_PREFIXO: string
    E1_TIPO: string
    E1_VALOR: number
    E1_VENCREA: string
    STATUS: '1'|'2'|'3'
}

type CondicaoPagamentoType = {
    E4_CODIGO: string
    E4_COND: string
    E4_DESCRI: string
    E4_FORMA: string
}

export {
    ContasAPagarStatus,
    type ContasAPagarType,
    type CondicaoPagamentoType,
}