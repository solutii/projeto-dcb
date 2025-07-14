import { NextResponse } from 'next/server'; // Importa NextResponse para retornar respostas HTTP

export async function POST(request: Request) {

    const body    = await request.json();

    const NUMERO = body.NUMERO
    const FILIAL = body.FILIAL
    
    const url = process.env.API_URL || 'http://localhost:8076/REST';
    const basicAuth = process.env.BASIC_AUTH || '';

    let response = await fetch(`${url}/COLETAXML`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
        },
        body: JSON.stringify({NUMERO,FILIAL}),
    })

    const data = await response.json();

    if(data?.sucesso === 'F') {
        return NextResponse.json({ error: data?.mensagem }, { status: 404 });
    }

    const arquivo = data.dados[0].ARQUIVO;
    response = await fetch(`${url}/BAIXAARQUIVO/${arquivo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(basicAuth).toString('base64')}`,
        }
    })

    const file = await response.arrayBuffer();

    return new NextResponse(file, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Content-Disposition': `attachment; filename=${arquivo}.xml`,
        },
    })
}
