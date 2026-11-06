import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const supabase = createClient(await cookies())

  try {
    const { cpf, date } = await req.json()

    const { data, error } = await supabase
      .from("segurados")
      .select("*")
      .eq("cpf", cpf)
      .eq("date", date)

    if (error) throw new Error("Erro ao buscar cadastro: " + error.message)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Cadastro não encontrado" }), {
      status: 404,
    })
  }
}
