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
import { Button } from "@/components/ui/button";
import { PedidoStatusLabel } from "@/types/pedido";
import { useFiltrosPedido } from "@/contexts/filtros/pedidos";
import { Input } from "@/components/ui/input";

export function FiltrosPedidos() {
  const {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    numeroPedido,
    setNumeroPedido,
    status,
    setStatus,
  } = useFiltrosPedido();

  return (
    <div className="space-y-5">
      {/* TÍTULO MOBILE */}
      <div className="md:hidden bg-emerald-700 p-4 rounded-md shadow-md shadow-black tracking-widest">
        <h2 className="text-2xl italic font-bold text-white text-left">
          Pedidos
        </h2>
      </div>

      {/* TÍTULO DESKTOP */}
      <div className="hidden md:flex items-center justify-between c">
        <h2 className="text-4xl italic font-bold text-gray-800">Pedidos</h2>
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
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* DATA INICIAL */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <CalendarDays className="w-5 h-5" />
            Data Final
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-lg justify-start text-left font-semibold text-gray-800 cursor-pointer italic shadow-md shadow-black hover:shadow-lg hover:shadow-black tracking-wider"
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

        {/* PRODUTO */}
        <div className="col-span-1 flex flex-col">
          <label className="text-base font-semibold text-gray-800 italic mb-1 flex items-center gap-1 tracking-wider">
            <FileCode className="w-5 h-5" />
            N° Pedido
          </label>
          <Input
            className="bg-white shadow-md shadow-black tracking-wider text-lg"
            value={numeroPedido}
            onChange={(event) => setNumeroPedido(event.target.value)}
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
              {Object.entries(PedidoStatusLabel).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
