import { NextResponse } from 'next/server'; // Importa NextResponse para retornar respostas HTTP

export async function GET(request: Request) {

    return NextResponse.json({
        message: 'This is a test route',
        status: 'success'
    })
}
