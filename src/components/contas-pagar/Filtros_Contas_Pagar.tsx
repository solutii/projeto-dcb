"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";

export function FiltrosContasPagar() {
  const {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    notaFiscal,
    setNotaFiscal,
    status,
    setStatus,
  } = useFiltrosFinanceiro();

  return (
    // CONTAINER PRINCIPAL
    <div className="space-y-4">
      {/* TÍTULO MOBILE */}
      <div className="md:hidden bg-emerald-700 p-4 rounded-md shadow-md shadow-black">
        <h2 className="text-2xl italic font-bold text-white text-left">
          Contas a Pagar
        </h2>
      </div>

      {/* TÍTULO DESKTOP */}
      <div className="hidden md:flex items-center justify-between">
        <h2 className="text-4xl italic font-bold text-gray-800">
          Contas a Pagar
        </h2>
      </div>

      {/* FILTRO */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* DATA INICIAL */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <CalendarDays className="w-5 h-5 " />
            Data Inicial
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-lg w-full justify-start text-left font-semibold text-gray-800 cursor-pointer italic shadow-md shadow-black hover:shadow-lg hover:shadow-black tracking-wider"
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
                onSelect={(data) => setDataInicio(data || new Date())}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* DATA FINAL */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <CalendarDays className="w-5 h-5" />
            Data Final
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-lg w-full justify-start text-left font-semibold text-gray-800 cursor-pointer italic shadow-md shadow-black hover:shadow-lg hover:shadow-black tracking-wider"
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
                onSelect={(data) => {
                  setDataFim(data || new Date());
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* NOTA FISCAL */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <FileCode className="w-5 h-5" />
            Nota Fiscal
          </label>
          <Input
            className="bg-white shadow-md shadow-black tracking-wider text-lg"
            value={notaFiscal}
            onChange={(event) => setNotaFiscal(event.target.value)}
          />
        </div>

        {/* STATUS */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <Filter className="w-5 h-5" />
            Status
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full cursor-pointer text-gray-800 font-semibold italic shadow-md shadow-black hover:shadow-lg hover:shadow-black tracking-wider text-lg">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md shadow-black">
              <SelectItem value="0">Todos</SelectItem>
              <SelectItem value="1">Pagas</SelectItem>
              <SelectItem value="2">Em Aberto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
