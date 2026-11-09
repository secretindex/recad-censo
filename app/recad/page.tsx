"use client"

import Link from "next/link"

import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import { useRouter } from "next/navigation"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import axios from "axios"

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardPanel,
} from "@/components/ui/card"

import { useState, useEffect, KeyboardEvent, MouseEventHandler } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { isValidCPF } from "./cpf_validator"
import { toastManager } from "@/components/ui/toast"

const DATE_FORMAT = "dd-MM-yyyy"

const Recad = () => {
  const router = useRouter()
  const [cpf, setCpf] = useState("")
  const [cpfTouched, setCpfTouched] = useState(false)
  const [date, setDate] = useState<Date | string | undefined>()

  const [inputValue, setInputValue] = useState("")
  const cpfIsValid = isValidCPF(cpf)

  function formatCPF(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8)

    const value = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)]
      .filter(Boolean)
      .join("/")

    setInputValue(value)
    setDate(value)
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setInputValue(format(selectedDate, DATE_FORMAT))
    } else {
      setInputValue("")
    }
  }

  const handleSubmitClick = async () => {
    if (!cpfIsValid) {
      toastManager.add({
        title: "CPF Invalido",
        description: "Digite um CPF válido.",
        type: "error",
      })
      return
    }

    if (!date) {
      toastManager.add({
        title: "Data de Nascimento Invalida",
        description: "Selecione uma data de nascimento válida.",
        type: "error",
      })
      return
    }

    const res = await axios.post("/api/recad", {
      cpf,
      date,
    })

    console.log("Response from API:", res.data)

    if (res.data.length > 0) {
      toastManager.add({
        title: "Cadastro encontrado",
        description:
          "Você será redirecionado para a página de recadastramento.",
        type: "success",
      })

      router.push(`/recad/${res.data[0].id}`)
    }
  }

  useEffect(() => {
    console.log("Selected date:", date)
  }, [date])

  useEffect(() => {
    setCpf(formatCPF(cpf))

    if (!cpfIsValid) {
      const tempCpf = cpf.replaceAll(".", "").replace("-", "")
      setCpf(tempCpf)
    }
  }, [cpfIsValid])

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center from-zinc-200 pb-8 dark:from-black">
      <Card className="w-2/6 shadow-md">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="m-auto text-2xl">Login</CardTitle>
        </CardHeader>
        <CardPanel className="flex flex-col gap-4">
          <CardDescription className="text-center">
            Digite seu CPF e data de nascimento para acessar o sistema de
            recadastramento.
          </CardDescription>
          <form
            className="flex flex-col gap-4"
            onKeyDownCapture={(e: KeyboardEvent) =>
              e.key === 'Enter' && handleSubmitClick()
            }
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="123.456.789-09"
                value={cpf}
                maxLength={14}
                onChange={(e) => setCpf(e.target.value)}
                onBlur={() => setCpfTouched(true)}
                aria-invalid={cpfTouched && !cpfIsValid}
                aria-describedby="cpf-validation"
                className="p-1"
              />
              <p
                id="cpf-validation"
                aria-live="polite"
                className={`text-sm ${cpfTouched && !cpfIsValid ? "text-destructive" : "text-green-600"}`}
              >
                {cpfTouched && !cpfIsValid
                  ? "Digite um CPF válido."
                  : cpfTouched && cpfIsValid
                    ? "CPF válido."
                    : ""}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Popover>
                <InputGroup>
                  <InputGroupInput
                    id="birthDate"
                    aria-label="Data de nascimento"
                    className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={handleDateChange}
                    onClick={(e) => e.stopPropagation()}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="dd-mm-aaaa"
                    type="text"
                    value={inputValue}
                  />
                  <InputGroupAddon>
                    <PopoverTrigger
                      aria-label="Select date"
                      render={
                        <Button
                          aria-label="Select date"
                          size="icon-xs"
                          variant="ghost"
                        />
                      }
                    >
                      <CalendarIcon aria-hidden="true" />
                    </PopoverTrigger>
                  </InputGroupAddon>
                </InputGroup>
                <PopoverPopup align="start" alignOffset={-4} sideOffset={8}>
                  <Calendar
                    mode="single"
                    onSelect={handleSelect}
                    selected={date as Date}
                  />
                </PopoverPopup>
              </Popover>
            </div>
            <Button className="w-full m-auto" onClick={handleSubmitClick}>
              Entrar
            </Button>
          </form>
        </CardPanel>
        <CardFooter>
          <Link
            className="m-auto text-gray-400 text-sm hover:underline"
            href="/saiba-mais"
          >
            Documentação e informações sobre o recadastramento
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Recad
