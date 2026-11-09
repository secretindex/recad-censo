"use client"

import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

import Image from "next/image"
import axios from "axios"

import { useParams } from "next/navigation"

const CadastroPage = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState<any>(null)

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/recad?id=${id}`)
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
        <div className="w-3/5 flex flex-col gap-8">
          <div className="w-full">
            <h1 className="text-xl text-center font-bold">
              Realize seu Cadastro
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Preencha os campos abaixo para realizar seu cadastro.
            </p>
          </div>
          <div className="w-full">
            {userData ? (
              <div className="flex flex-col gap-2">
                <Image
                  src={"https://api.dicebear.com/10.x/line-face/svg"}
                  alt="Foto do usuário"
                  className="rounded-md"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div>
                  <p className="text-md font-bold">{userData.nome_completo}</p>
                  <span>
                    {userData.cpf.slice(0, 3) +
                      "." +
                      userData.cpf.slice(3, 6) +
                      "." +
                      userData.cpf.slice(6, 9) +
                      "-" +
                      userData.cpf.slice(9, 11)}
                  </span>
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
