import { NextResponse } from 'next/server'; // Importa NextResponse para retornar respostas HTTP

export async function POST(request: Request) {

    const body    = await request.json();

    const CLIENTE = body.CLIENTE
    const DATAFIM = body.DATAFIM
    const DATAINI = body.DATAINI
    const FILIAL = body.FILIAL
    const LOJA = body.LOJA
    
    const url = process.env.API_URL || 'http://localhost:8076/REST';
    const basicAuth = process.env.BASIC_AUTH || '';

    const response = await fetch(`${url}/COLETAPEDIDO`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
        },
        body: JSON.stringify({CLIENTE,DATAFIM, DATAINI,FILIAL, LOJA,}),
    })

    const data = await response.json();

    return NextResponse.json(data)
}
