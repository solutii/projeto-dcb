"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Receipt,
  Menu,
  X,
  ChevronRight,
  Heart,
  Shield,
  Activity,
  Sparkles,
  Settings,
  User,
  Key,
  LogOut,
  ChevronDown,
  Bell,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { logoutClient } from "@/lib/logout";

export function SidebarNavegacao() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fecha o dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quando a rota muda, reseta o loadingLink e fecha menu mobile
  useEffect(() => {
    setLoadingLink(null);
    setIsMobileOpen(false);
  }, [pathname]);

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-emerald-500/30",
    },
    {
      href: "/contas-pagar",
      label: "Contas a Pagar",
      icon: FileText,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      href: "/pedidos",
      label: "Pedidos",
      icon: ShoppingCart,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-violet-500/30",
    },
    {
      href: "/notas-fiscais",
      label: "Notas Fiscais",
      icon: Receipt,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-black",
    },
  ];

  const dropdownItems = [
    {
      icon: User,
      label: "Perfil do Usuário",
      description: "João Silva",
      action: () => console.log("Perfil"),
      color: "text-emerald-400",
    },
    {
      icon: Key,
      label: "Alterar Senha",
      description: "Segurança da conta",
      action: () => console.log("Alterar senha"),
      color: "text-blue-400",
    },
    {
      icon: Bell,
      label: "Notificações",
      description: "Configurar alertas",
      action: () => console.log("Notificações"),
      color: "text-yellow-400",
    },
    {
      icon: HelpCircle,
      label: "Suporte",
      description: "Central de ajuda",
      action: () => console.log("Suporte"),
      color: "text-purple-400",
    },
    {
      icon: LogOut,
      label: "Fazer Logout",
      description: "Sair do sistema",
      action: () => logoutClient(),
      color: "text-red-400",
      isDanger: true,
    },
  ];

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Botão do menu mobile */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 md:hidden group bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 backdrop-blur-xl border border-emerald-300/30 rounded-2xl p-3 text-white hover:from-emerald-800/95 hover:to-emerald-700/95 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>

      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar Principal */}
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
        {/* Background com múltiplas camadas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-cyan-950/40" />
        <div className="absolute inset-0 backdrop-blur-xl" />

        {/* Borda com efeito neon */}
        <div className="absolute inset-0 border-r border-emerald-300/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" />

        {/* Conteúdo da sidebar */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-emerald-300/10">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/logo-dcb.png"
                    alt="Logo DCB"
                    width={120}
                    height={40}
                    className="object-contain brightness-110"
                    priority
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-lg blur-sm -z-10" />
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            )}

            <button
              onClick={toggleCollapse}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-300/30 hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-500 text-emerald-200 hover:text-white group hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/20"
            >
              <ChevronRight
                size={16}
                className={`transition-all duration-500 group-hover:scale-110 ${
                  isCollapsed ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {/* Status */}
          {!isCollapsed && (
            <div className="px-6 py-4 border-b border-emerald-300/10">
              <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-300/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                    <span className="text-emerald-200 text-sm font-medium">
                      Sistema Online
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
                <div className="text-white/90 text-xs font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-emerald-200/70 text-xs capitalize">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          )}

          {/* Links de navegação */}
          <div className="flex-1 flex flex-col gap-4 p-4 mt-2">
            {links.map(({ href, label, icon: Icon, color, shadowColor }) => {
              const isActive = pathname === href;
              const isLoading = loadingLink === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoadingLink(href);
                    router.push(href);
                  }}
                  className={`
                    group relative flex items-center rounded-2xl text-sm font-semibold
                    transition-all duration-700 ease-out transform hover:scale-[1.02] active:scale-95
                    overflow-hidden backdrop-blur-sm
                    ${isCollapsed ? "px-4 py-4 justify-center" : "px-6 py-4"}
                    ${
                      isActive
                        ? `text-white bg-gradient-to-r ${color} shadow-2xl ${shadowColor} border border-white/30`
                        : `text-white/70 hover:text-white bg-gradient-to-r from-white/5 via-white/2 to-transparent hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:shadow-xl border border-white/5 hover:border-white/20`
                    }
                  `}
                >
                  {/* Efeito ondulação */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                  {/* Ícone */}
                  <div className="relative z-10 flex items-center">
                    <Icon
                      className={`
                        transition-all duration-500 flex-shrink-0
                        ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}
                        ${
                          isActive
                            ? "text-white drop-shadow-lg scale-110"
                            : "text-white/70 group-hover:text-white group-hover:drop-shadow-md group-hover:scale-105"
                        }
                      `}
                    />
                  </div>

                  {/* Label ou spinner */}
                  {!isCollapsed && (
                    <div className="ml-4 relative z-10 flex items-center justify-between flex-1">
                      <span className="tracking-wide whitespace-nowrap font-medium">
                        {label}
                      </span>
                      {isLoading && (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      )}
                    </div>
                  )}

                  {/* Tooltip no modo collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-20 bg-gradient-to-r from-slate-800/95 to-emerald-800/95 backdrop-blur-xl text-white px-4 py-3 rounded-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-500 border border-emerald-300/20 shadow-2xl whitespace-nowrap z-50">
                      <div className="flex items-center space-x-2">
                        <span>{label}</span>
                      </div>
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-slate-800 to-emerald-800 rotate-45 border-l border-b border-emerald-300/20" />
                    </div>
                  )}

                  {/* Borda interna */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                      isActive
                        ? "border border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"
                        : "border border-emerald-300/5 group-hover:border-emerald-300/20"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Dropdown de Configurações */}
          <div className="px-4 pb-4" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`
                  group relative flex items-center w-full rounded-2xl text-sm font-semibold
                  transition-all duration-700 ease-out transform hover:scale-[1.02] active:scale-95
                  overflow-hidden backdrop-blur-sm
                  ${isCollapsed ? "px-4 py-4 justify-center" : "px-6 py-4"}
                  text-white/70 hover:text-white bg-gradient-to-r from-white/5 via-white/2 to-transparent hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:shadow-xl border border-white/5 hover:border-white/20
                `}
              >
                {/* Efeito de ondulação */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                {/* Ícone */}
                <div className="relative z-10 flex items-center">
                  <Settings
                    className={`
                      transition-all duration-500 flex-shrink-0
                      ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}
                      text-white/70 group-hover:text-white group-hover:drop-shadow-md group-hover:scale-105
                    `}
                  />
                </div>

                {/* Label */}
                {!isCollapsed && (
                  <div className="ml-4 relative z-10 flex items-center justify-between flex-1">
                    <span className="tracking-wide whitespace-nowrap font-medium">
                      Configurações
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                )}

                {/* Tooltip para modo collapsed */}
                {isCollapsed && (
                  <div className="absolute left-20 bg-gradient-to-r from-slate-800/95 to-emerald-800/95 backdrop-blur-xl text-white px-4 py-3 rounded-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-500 border border-emerald-300/20 shadow-2xl whitespace-nowrap z-50">
                    <div className="flex items-center space-x-2">
                      <span>Configurações</span>
                    </div>
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-slate-800 to-emerald-800 rotate-45 border-l border-b border-emerald-300/20" />
                  </div>
                )}

                {/* Borda interna */}
                <div className="absolute inset-0 rounded-2xl transition-all duration-500 border border-emerald-300/5 group-hover:border-emerald-300/20" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && !isCollapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-gradient-to-br from-slate-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-emerald-300/20 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                  <div className="p-2">
                    {dropdownItems.map(
                      ({
                        icon: Icon,
                        label,
                        description,
                        action,
                        color,
                        isDanger,
                      }) => (
                        <button
                          key={label}
                          onClick={action}
                          className={`
                          group w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300
                          ${
                            isDanger
                              ? "hover:bg-red-500/20 text-red-400 hover:text-red-300"
                              : "hover:bg-white/10 text-white/80 hover:text-white"
                          }
                          hover:scale-[1.02] active:scale-95
                        `}
                        >
                          <Icon
                            className={`w-4 h-4 mr-3 ${color} group-hover:scale-110 transition-transform duration-300`}
                          />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{label}</div>
                            <div className="text-xs text-white/50">
                              {description}
                            </div>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer aprimorado */}
          <div className="mt-auto p-4 border-t border-emerald-300/10">
            {!isCollapsed ? (
              <div className="space-y-4">
                {/* Redes sociais aprimoradas */}
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-500 shadow-lg hover:shadow-pink-500/30 hover:scale-110 active:scale-95 group"
                  >
                    <FaInstagram
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-lg hover:shadow-blue-500/30 hover:scale-110 active:scale-95 group"
                  >
                    <FaFacebook
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-500 shadow-lg hover:shadow-blue-500/30 hover:scale-110 active:scale-95 group"
                  >
                    <FaLinkedin
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Copyright aprimorado */}
                <div className="text-center">
                  <p className="text-emerald-200/80 text-sm font-medium">
                    DCB Distribuidora
                  </p>
                  <p className="text-emerald-200/60 text-xs">
                    Cirúrgica Brasileira • Desde 1978
                  </p>
                  <div className="flex items-center justify-center mt-2 space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-300" />
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                {/* Ícones sociais compactos */}
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-500 shadow-lg hover:shadow-pink-500/30 hover:scale-110 active:scale-95"
                  >
                    <FaInstagram size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-lg hover:shadow-blue-500/30 hover:scale-110 active:scale-95"
                  >
                    <FaFacebook size={14} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-500 shadow-lg hover:shadow-blue-500/30 hover:scale-110 active:scale-95"
                  >
                    <FaLinkedin size={14} />
                  </a>
                </div>

                {/* Indicador de status compacto */}
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
              </div>
            )}
          </div>
        </div>

        {/* Efeitos de fundo decorativos */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-400/5 to-transparent" />
        </div>
      </nav>

      {/* Spacer para o conteúdo principal */}
      <div
        className={`hidden md:block transition-all duration-700 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      />
    </>
  );
}
