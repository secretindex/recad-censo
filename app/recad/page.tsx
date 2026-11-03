import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardPanel,
} from "@/components/ui/card";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Recad = () => {
  const [cpf, setCpf] = useState<number>();
  const [birthDate, setBirthDate] = useState<string>("");

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center from-zinc-200 pb-8 dark:from-black">
      <Card className="w-2/6">
        <CardHeader>
          <CardTitle className="m-auto">Login</CardTitle>
        </CardHeader>
        <CardPanel className="flex flex-col gap-4">
          <CardDescription className="text-center">
            Digite seu CPF e data de nascimento para acessar o sistema de recadastramento.
          </CardDescription>
          <form>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(Number(e.target.value))}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </CardPanel>
        <CardFooter>
          <Link className="m-auto text-sm hover:underline" href="/saiba-mais">
            Saiba mais
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Recad;
