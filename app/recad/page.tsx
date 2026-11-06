"use client"

import Link from "next/link"

import { format, isValid, parse } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
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

import { useState, useEffect } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { isValidCPF } from "./cpf_validator"
import { toastManager } from "@/components/ui/toast"

const Recad = () => {
  const [cpf, setCpf] = useState("")
  const [cpfTouched, setCpfTouched] = useState(false)
  const [date, setDate] = useState<Date | undefined>()

  const [inputValue, setInputValue] = useState("")
  const cpfIsValid = isValidCPF(cpf)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCpfTouched(true)
    if (!cpfIsValid) return
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value) {
      const parsedDate = parse(
        value,
        "yyyy-MM-dd",
        new Date().toLocaleTimeString("pt-BR"),
      )
      if (isValid(parsedDate)) {
        setDate(parsedDate)
      }
    } else {
      setDate(undefined)
    }
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setInputValue(format(selectedDate, "yyyy-MM-dd"))
    } else {
      setInputValue("")
    }
  }

  const handleSubmitClick = () => {
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

    axios.post("/api/recad", { cpf, date })
  }

  useEffect(() => {
    console.log("Selected date:", date)
  }, [date])

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                inputMode="numeric"
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
                    aria-label="Select date"
                    className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={handleInputChange}
                    onClick={(e) => e.stopPropagation()}
                    type="date"
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
                    selected={date}
                  />
                </PopoverPopup>
              </Popover>
            </div>
            <Button className="w-full m-auto" type="submit" onClick={handleSubmitClick}>
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
