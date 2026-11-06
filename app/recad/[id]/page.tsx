"use client"

import { useParams } from "next/navigation"
import axios from "axios"
import { useState } from "react"

const CadastroPage = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)

  const fetchUserData = async (id: string) => {
    try {
      const response = await axios.get(`/api/recad/${id}`)
      console.log("User data:", response.data)
    }
    catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl font-bold">Cadastro Page</h1>
      </div>
      <div>
        <p>Parametro ID: {id}</p>
      </div>
    </div>
  )
}

export default CadastroPage
