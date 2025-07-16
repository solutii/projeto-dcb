"use client";

import { useState } from "react";
import { CalendarDays, Filter, FileCode } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FiltrosDashboard({
  periodo,setPeriodo
} : { periodo: string, setPeriodo: (value: string) => void }) {
  
  

  return (
    <div className="space-y-4">
      {/* Título e Data Atual */}
      <div className="flex items-center justify-between">
        {/* Título */}
        <h2 className="text-4xl italic font-bold text-gray-600">Dashboard</h2>
        {/* Data Atual */}
      </div>

      {/* Campos de Filtro */}
      <div className="grid grid-cols-6 gap-4">
        {/* Data Inicial */}
        {/* <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-600 italic mb-1 flex items-center gap-1">
            <CalendarDays className="w-5 h-5 " />
            Data Inicial
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-semibold text-gray-600 cursor-pointer italic shadow-md shadow-black hover:shadow-lg hover:shadow-black"
              >
                {dataInicio
                  ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 bg-white shadow-md shadow-black"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dataInicio}
                onSelect={setDataInicio}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div> */}

        {/* Data Final */}
        {/* <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-600 italic mb-1 flex items-center gap-1">
            <CalendarDays className="w-5 h-5" />
            Data Final
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-semibold text-gray-600 cursor-pointer italic shadow-md shadow-black hover:shadow-lg hover:shadow-black"
              >
                {dataFim
                  ? format(dataFim, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 bg-white shadow-md shadow-black"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dataFim}
                onSelect={setDataFim}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div> */}

        {/* Status */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-600 italic mb-1 flex items-center gap-1">
            <Filter className="w-5 h-5" />
            Status
          </label>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-full cursor-pointer text-gray-600 font-semibold italic shadow-md shadow-black hover:shadow-lg hover:shadow-black">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md shadow-black">
              <SelectItem value="0">Todos</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
