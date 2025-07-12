import { NextResponse } from 'next/server'; // Importa NextResponse para retornar respostas HTTP

export async function POST(request: Request) {

    const body      = await request.json();
    const CLIENTE   = body.CLIENTE;
    const LOJA      = body.LOJA;
    const DATAINI   = body.DATAINI;
    const DATAFIM   = body.DATAFIM;
    const NOTAFISCAL= body.NOTAFISCAL
    
    const url = process.env.API_URL || 'http://localhost:8076/REST';
    const basicAuth = process.env.BASIC_AUTH || '';

    const response = await fetch(`${url}/COLETAFINANCEIRO`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
            "tenantid": "01,0101",
            "connection": "keep-alive",
        },
        body: JSON.stringify({CLIENTE, LOJA, DATAINI, DATAFIM, NOTAFISCAL}),
    })

    const data = await response.json();

    return NextResponse.json(data)
}
