"use client"

import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between h-screen font-sans bg-white dark:bg-black sm:items-start">
        <section className="flex flex-col w-full h-screen justify-center items-center from-zinc-200 pb-8 dark:from-black">
        <Card className="w-2/6">
          <CardHeader>
            <CardTitle className="m-auto">Recad Censo</CardTitle>
          </CardHeader>
          <CardPanel className="flex flex-col gap-4">
            <CardDescription className="text-center">
              Realize seu recadastramento de forma rápida e prática, garantindo que suas informações estejam sempre atualizadas.
            </CardDescription>
            <Link href="/recad" className="m-auto">
            <Button className="m-auto" >
              Iniciar
            </Button>
            </Link>
          </CardPanel>
          <CardFooter>
            <Link className="m-auto text-sm hover:underline" href="/saiba-mais">
              Saiba mais
            </Link>
          </CardFooter>
        </Card>
        </section>
      </main>
    </div>
  );
}
