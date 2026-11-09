import { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  const supabase = createClient(await cookies())
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response(JSON.stringify({ error: "ID não fornecido" }), {
        status: 400,
      })
    }
    const { data, error } = await supabase
      .from("segurados")
      .select("*")
      .eq("id", id)
    if (error) throw new Error("Erro ao buscar cadastro: " + error.message)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar cadastro" }), {
      status: 500,
    })
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient(await cookies())

  try {
    const { cpf, date } = await req.json()
    const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    })

    const { data, error } = await supabase
      .from("segurados")
      .select("*")
      .eq("cpf", cpf as string)
      .eq("data_de_nascimento", formattedDate)

    if (error) throw new Error("Erro ao buscar cadastro: " + error.message)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Cadastro não encontrado" }), {
      status: 404,
    })
  }
}
