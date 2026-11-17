"use client"

import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const SaibaMais = () => {
  const router = useRouter()
  const homeReturn = () => {
    router.push("/")
  }
  return (
    <section className="min-h-screen w-full px-4 py-8 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-6 text-foreground">
        <Button
          onClick={homeReturn}
          className="bg-white text-black border-gray-200 hover:bg-gray-100 transition-all ease-in-out"
        >
          <ArrowLeft />
          <Home />
        </Button>
        <header className="space-y-3 border-b pb-5">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Recad Censo®
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Como funciona
          </h1>
        </header>

        <div className="space-y-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          <p>
            Pensando neste momento de distanciamento social, a Recad Censo® foi
            criada para que você possa ficar quite com o Censo Previdenciário,
            atualizando as suas próprias informações e digitalizando os seus
            documentos pessoais de forma muito rápida, prática e segura — e o
            principal: sem precisar sair do conforto do seu lar. Legal, né?
          </p>
          <p>
            Continue lendo para saber mais sobre esta ferramenta ou assista aos
            vídeo-tutoriais.
          </p>
        </div>
      </article>
    </section>
  )
}

export default SaibaMais
