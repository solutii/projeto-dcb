"use client";

import React, { useState } from "react";
import { CalendarDays, PackageSearch, Filter } from "lucide-react";

export function FiltrosTabelaContasPagar() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [produto, setProduto] = useState("");
  const [status, setStatus] = useState("");

  const handleFiltrar = () => {
    console.log({ dataInicio, dataFim, produto, status });
    // Aqui você pode chamar uma função para atualizar a tabela
  };

  return (
    <div className="rounded-lg border border-slate-200 p-6 bg-white shadow-md mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Data Inicial */}
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Data Inicial
          </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md focus:outline-none"
          />
        </div>

        {/* Data Final */}
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Data Final
          </label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md focus:outline-none"
          />
        </div>

        {/* Produto */}
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
            <PackageSearch className="w-4 h-4" />
            Produto
          </label>
          <select
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="Luvas Nitrílicas">Luvas Nitrílicas</option>
            <option value="Seringas 10ml">Seringas 10ml</option>
            <option value="Máscaras N95">Máscaras N95</option>
            <option value="Cateteres">Cateteres</option>
            <option value="Gazes Estéreis">Gazes Estéreis</option>
            <option value="Termômetros">Termômetros</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="Pagas">Pagas</option>
            <option value="Em Aberto">Em Aberto</option>
          </select>
        </div>

        {/* Botão */}
        <div>
          <button
            onClick={handleFiltrar}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
