"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SidebarHeader } from "./Header_Sidebar";
import { SidebarLinks } from "./Links_Sidebar";
import { SidebarFooter } from "./Footer_Sidebar";
import { SidebarActions } from "./Actions_Sidebar";

export function SidebarNavegacao() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fecha menu mobile ao navegar
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Botão Mobile */}
      <button
        onClick={toggleMobile}
        className="fixed top-6 right-6 z-50 md:hidden group bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 backdrop-blur-xl border border-emerald-300/30 rounded-2xl p-3 text-white hover:from-emerald-800/95 hover:to-emerald-700/95 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed left-0 top-0 h-full z-50 transition-all duration-700 ease-out
          ${isCollapsed ? "w-20" : "w-72"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Background camadas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-cyan-950/40" />
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 border-r border-emerald-300/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" />

        {/* Conteúdo */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <SidebarHeader
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            currentTime={currentTime}
          />

          {/* Links de navegação */}
          <SidebarLinks isCollapsed={isCollapsed} />

          {/* Botões de ações (Alterar senha / Logout) */}
          <SidebarActions
            isCollapsed={isCollapsed}
            expandSidebar={() => setIsCollapsed(false)}
          />

          {/* Rodapé com redes sociais */}
          <SidebarFooter isCollapsed={isCollapsed} />
        </div>

        {/* Decorações finais */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-400/5 to-transparent" />
        </div>
      </nav>

      {/* Spacer para conteúdo ao lado da sidebar */}
      <div
        className={`hidden md:block transition-all duration-700 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      />
    </>
  );
}
