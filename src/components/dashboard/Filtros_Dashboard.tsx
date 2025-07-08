"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, PackageSearch, Filter, ChevronDown, ChevronUp } from "lucide-react";

export function FiltrosDashboard() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [produto, setProduto] = useState("");
  const [status, setStatus] = useState("");

  // Estado para controlar se o filtro está visível ou não
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Estado para colapsar filtros em mobile
  const [isExpanded, setIsExpanded] = useState(false);

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
    // Fechar filtros em mobile após aplicar
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const handleLimpar = () => {
    setDataInicio("");
    setDataFim("");
    setProduto("");
    setStatus("");
  };

  return (
    <div
      className={`
        rounded-lg border border-slate-200 p-3 sm:p-4 lg:p-6
        sticky top-16 sm:top-20 md:top-32 lg:top-40
        z-40
        bg-white shadow-md shadow-black
        mb-4 sm:mb-6 lg:mb-8
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
      style={{ minWidth: "280px" }}
    >
      {/* Header com botão de expansão para mobile */}
      <div className="flex items-center justify-between mb-3 md:hidden">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Filtros - sempre visíveis em desktop, colapsáveis em mobile */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-end">
          {/* Data Inicial */}
          <div className="flex-1 w-full md:w-auto">
            <label className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
              <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4" />
              Data Inicial
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Data Final */}
          <div className="flex-1 w-full md:w-auto">
            <label className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
              <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4" />
              Data Final
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Produto */}
          <div className="flex-1 w-full md:w-auto">
            <label className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
              <PackageSearch className="w-3 h-3 sm:w-4 sm:h-4" />
              Produto
            </label>
            <select
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
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
          <div className="flex-1 w-full md:w-auto">
            <label className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-black shadow-sm hover:shadow-md hover:shadow-black shadow-black border-none focus:ring-0 focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="Pagas">Pagas</option>
              <option value="Em Aberto">Em Aberto</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleFiltrar}
              className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition text-xs sm:text-sm whitespace-nowrap"
            >
              Aplicar Filtros
            </button>
            <button
              onClick={handleLimpar}
              className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-xs sm:text-sm whitespace-nowrap"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de filtros ativos em mobile quando colapsado */}
      {!isExpanded && (dataInicio || dataFim || produto || status) && (
        <div className="md:hidden mt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-500">
              Filtros ativos
            </span>
          </div>
        </div>
      )}
    </div>
  );
}