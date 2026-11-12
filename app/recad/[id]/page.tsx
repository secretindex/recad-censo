"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

import Image from "next/image"
import axios from "axios"

import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CadastroPage = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState<any>(null)

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/recad?id=${id}`)
      console.log(response.data[0])
      setUserData(response.data[0])
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    console.log("Fetching user data for ID:", id)
    fetchUserData()
  }, [id])

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50">
      <section className="flex flex-col gap-8 h-screen w-2/4 py-8 border-x shadow-lg bg-white items-center">
        <div className="w-3/4 flex flex-col gap-8">
          <div className="w-full">
            <h1 className="text-2xl text-center font-bold">
              Realize seu Cadastro
            </h1>
            <p className="text-sm italic text-cyan-600 text-center">
              Preencha os campos abaixo para realizar seu cadastro.
            </p>
          </div>
          <div className="w-full">
            {userData ? (
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Image
                    src={"https://api.dicebear.com/10.x/line-face/svg"}
                    alt="Foto do usuário"
                    className="rounded-md"
                    width={150}
                    height={150}
                    unoptimized
                  />
                  <div className="flex gap-1 font-xs text-cyan-600">
                    <span className="font-semibold">
                      {(userData.matricula.categoria as string).toUpperCase()}{" "}
                    </span>
                    <span>/</span>
                    <span>{userData.matricula.matricula}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-bold">{userData.nome_completo}</p>
                  <div className="w-full flex gap-4 justify-between">
                    <div className="flex flex-col w-full gap-1">
                      <Label className="font-normal text-sm text-zinc-800">
                        CPF
                      </Label>
                      <Input
                        readOnly
                        disabled
                        value={
                          userData.cpf.slice(0, 3) +
                          "." +
                          userData.cpf.slice(3, 6) +
                          "." +
                          userData.cpf.slice(6, 9) +
                          "-" +
                          userData.cpf.slice(9, 11)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <Label className="font-normal text-sm text-zinc-800">
                        Data de Nascimento
                      </Label>
                      <Input
                        readOnly
                        disabled
                        value={new Date(
                          `${userData.data_de_nascimento}T00:00:10`,
                        ).toLocaleDateString("pt-BR")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-center items-center">
                <Spinner />
                <span className="text-xs text-gray-500">
                  Carregando dados do usuário...
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CadastroPage
