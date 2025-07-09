// components/SidebarNavegacao.tsx
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
} from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SidebarNavegacao() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-emerald-500 to-emerald-700",
      shadowColor: "shadow-emerald-500/20",
    },
    {
      href: "/tabela-contas-pagar",
      label: "Contas a Pagar",
      icon: FileText,
      color: "from-teal-500 to-teal-700",
      shadowColor: "shadow-teal-500/20",
    },
    {
      href: "/pedidos",
      label: "Pedidos",
      icon: ShoppingCart,
      color: "from-green-500 to-green-700",
      shadowColor: "shadow-green-500/20",
    },
    {
      href: "/configuracoes",
      label: "Notas Fiscais",
      icon: Receipt,
      color: "from-lime-500 to-lime-700",
      shadowColor: "shadow-lime-500/20",
    },
  ];

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Botão do menu mobile */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 md:hidden bg-gradient-to-r from-emerald-900/90 to-emerald-800/90 backdrop-blur-md border border-emerald-300/20 rounded-xl p-3 text-white hover:from-emerald-800/90 hover:to-emerald-700/90 transition-all duration-300 shadow-2xl"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed left-0 top-0 h-full z-50 bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 
          backdrop-blur-xl border-r border-white/10 shadow-2xl transition-all duration-500 ease-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header do sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {!isCollapsed && (
            <div className="flex items-center">
              <Image
                src="/logo-dcb.png"
                alt="Logo DCB"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 text-white/70 hover:text-white"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Links de navegação */}
        <div className="flex flex-col gap-2 p-4 mt-4">
          {links.map(({ href, label, icon: Icon, color, shadowColor }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group relative flex items-center rounded-2xl text-sm font-semibold
                  transition-all duration-500 ease-out transform hover:scale-[1.02] active:scale-95
                  overflow-hidden
                  ${isCollapsed ? "px-4 py-4 justify-center" : "px-5 py-4"}
                  ${
                    isActive
                      ? `text-white bg-gradient-to-br ${color} shadow-2xl ${shadowColor} border border-white/20`
                      : "text-white/70 hover:text-white bg-gradient-to-br from-white/5 via-white/2 to-transparent hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 border border-transparent"
                  }
                `}
              >
                {/* Efeito de brilho animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                {/* Glow effect interno */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isActive ? "opacity-30" : ""}
                    bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10
                  `}
                />

                {/* Ícone */}
                <Icon
                  className={`
                    transition-all duration-300 relative z-10 flex-shrink-0
                    ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}
                    ${
                      isActive
                        ? "text-white drop-shadow-lg"
                        : "text-white/70 group-hover:text-white group-hover:drop-shadow-md"
                    }
                  `}
                />

                {/* Label */}
                {!isCollapsed && (
                  <span className="ml-4 relative z-10 tracking-wide whitespace-nowrap">
                    {label}
                  </span>
                )}

                {/* Tooltip para modo collapsed */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-emerald-800/95 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-500 border border-emerald-300/10 shadow-xl whitespace-nowrap z-50">
                    {label}
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-emerald-800 rotate-45 border-l border-b border-emerald-300/10" />
                  </div>
                )}

                {/* Indicador de página ativa */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full opacity-90" />
                )}

                {/* Reflexo glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-2xl pointer-events-none" />

                {/* Borda interna brilhante */}
                <div className="absolute inset-0 rounded-2xl border border-emerald-300/5 group-hover:border-emerald-300/10 transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Footer do sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-300/10">
          {!isCollapsed ? (
            <div className="space-y-3">
              {/* Redes sociais */}
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 hover:scale-105"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                >
                  <FaFacebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                >
                  <FaLinkedin size={20} />
                </Link>
              </div>

              {/* Copyright */}
              <p className="text-sm text-emerald-200/60 text-center">
                DCB Distribuidora Cirúrgica Brasileira. Desde de 1978.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-1">
                <a
                  href="#"
                  className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 hover:scale-105"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                >
                  <FaFacebook size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                >
                  <FaLinkedin size={14} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Efeito de fundo decorativo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/5 blur-3xl opacity-30" />
      </nav>

      {/* Spacer para o conteúdo principal */}
      <div
        className={`hidden md:block transition-all duration-500 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      />
    </>
  );
}
