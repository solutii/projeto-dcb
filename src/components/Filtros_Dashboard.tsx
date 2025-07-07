"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, PackageSearch, Filter } from "lucide-react";

export function FiltrosDashboard() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [produto, setProduto] = useState("");
  const [status, setStatus] = useState("");

  // Estado para controlar se o filtro está visível ou não
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Quando estiver perto do topo, mostrar filtro
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scroll descendo: esconder filtro
        setVisible(false);
      } else {
        // Scroll subindo: mostrar filtro
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleFiltrar = () => {
    console.log({ dataInicio, dataFim, produto, status });
    // Atualize os gráficos aqui, se quiser
  };

  return (
    <div
      className={`
        rounded-lg border border-slate-200 p-6
        sticky top-20 md:top-32 lg:top-40
        z-40
        bg-white shadow-md shadow-black
        mb-8
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
      style={{ minWidth: "320px" }}
    >
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
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
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
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
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
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
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
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
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
