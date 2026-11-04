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

const Recad = () => {
  const [cpf, setCpf] = useState<number>()
  const [date, setDate] = useState<Date | undefined>();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      }
    } else {
      setDate(undefined);
    }
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setInputValue(format(selectedDate, "yyyy-MM-dd"));
    } else {
      setInputValue("");
    }
  };

  useEffect(() => {
    console.log("Selected date:", date);
  }, [date])

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center from-zinc-200 pb-8 dark:from-black">
      <Card className="w-2/6 shadow-md">
        <CardHeader>
          <CardTitle className="m-auto">Login</CardTitle>
        </CardHeader>
        <CardPanel className="flex flex-col gap-4">
          <CardDescription className="text-center">
            Digite seu CPF e data de nascimento para acessar o sistema de
            recadastramento.
          </CardDescription>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="123.456.789-10"
                value={cpf}
                maxLength={11}
                onChange={(e) => setCpf(Number(e.target.value))}
                className="p-1"
              />
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
          </form>
          <Button className="w-full m-auto">Entrar</Button>
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
