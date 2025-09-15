import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint") || "pragas";
  const page = searchParams.get("page") || "1";

  const token = process.env.AGROFIT_API_TOKEN;

  const url = `https://api.cnptia.embrapa.br/agrofit/v1/${endpoint}?page=${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro ao consultar API" },
      { status: 500 }
    );
  }
}
