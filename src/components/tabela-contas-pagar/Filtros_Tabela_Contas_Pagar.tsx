"use client";

import React, { useState } from "react";
import { CalendarDays, PackageSearch, Filter } from "lucide-react";

export function FiltrosTabelaContasPagar() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [produto, setProduto] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="rounded-lg border border-slate-300 p-2 bg-white shadow-xs shadow-black">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Data Inicial */}
        <div>
          <label className="text-sm font-semibold text-gray-700 italic mb-2 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Data Inicial
          </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg text-sm text-gray-700 font-semibold shadow-xs hover:shadow-md hover:shadow-black shadow-black focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Data Final */}
        <div>
          <label className="text-sm font-semibold text-gray-700 italic mb-2 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Data Final
          </label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg text-sm text-gray-700 font-semibold shadow-xs hover:shadow-md hover:shadow-black shadow-black focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Nota Fiscal */}
        <div>
          <label className="text-sm font-semibold text-gray-700 italic mb-2 flex items-center gap-1">
            <PackageSearch className="w-4 h-4" />
            Nota Fiscal
          </label>
          <select
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg text-sm text-gray-700 font-semibold shadow-xs hover:shadow-md hover:shadow-black shadow-black focus:ring-0 focus:outline-none"
          >
            <option value="">Todas</option>
            <option value="Luvas Nitrílicas">Luvas Nitrílicas</option>
            <option value="Seringas 10ml">Seringas 10ml</option>
            <option value="Máscaras N95">Máscaras N95</option>
            <option value="Cateteres">Cateteres</option>
            <option value="Gazes Estéreis">Gazes Estéreis</option>
            <option value="Termômetros">Termômetros</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-semibold text-gray-700 italic mb-2 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg text-sm text-gray-700 font-semibold shadow-xs hover:shadow-md hover:shadow-black shadow-black focus:ring-0 focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="Pagas">Pagas</option>
            <option value="Em Aberto">Em Aberto</option>
          </select>
        </div>
      </div>
    </div>
  );
}
