import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const supabase = createClient(await cookies())

  try {
    const { cpf, date } = await req.json()
    const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

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
