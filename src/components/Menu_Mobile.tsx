// components/MenuNavegacaoMobile.tsx
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MenuNavegacaoMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-blue-500 to-blue-700",
    },
    {
      href: "/contas-a-pagar",
      label: "Contas a Pagar",
      icon: FileText,
      color: "from-purple-500 to-purple-700",
    },
    {
      href: "/pedidos",
      label: "Pedidos",
      icon: ShoppingCart,
      color: "from-green-500 to-green-700",
    },
    /* {
      href: "/notas-fiscais",
      label: "Notas Fiscais",
      icon: Receipt,
      color: "from-orange-500 to-orange-700",
    }, */
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Header mobile com botão do menu */}
      <div className="md:hidden fixed top-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={toggleMenu}
            className="relative p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            {/* Efeito de brilho no botão */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </div>

      {/* Overlay do menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Menu lateral deslizante */}
      <nav
        className={`
        md:hidden fixed top-0 left-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header do menu */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links do menu */}
        <div className="py-4 space-y-2">
          {links.map(({ href, label, icon: Icon, color }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`
                  relative mx-3 flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-${
                          color.split("-")[1]
                        }-500/25`
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }
                `}
              >
                {/* Efeito de brilho animado para item ativo */}
                {isActive && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl opacity-20 animate-pulse`}
                  />
                )}

                {/* Partículas flutuantes para item ativo */}
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div
                      className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <div
                      className="absolute top-3 right-4 w-0.5 h-0.5 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute bottom-2 left-8 w-1 h-1 bg-white/50 rounded-full animate-bounce"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                )}

                <div className="relative z-10 flex items-center gap-4">
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                  <span className="font-medium">{label}</span>
                </div>

                {/* Indicador de página ativa */}
                {isActive && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}

                {/* Reflexo glassmorphism */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Rodapé decorativo */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <div className="mt-4 text-center text-sm text-slate-500">
            Sistema v1.0
          </div>
        </div>

        {/* Efeito de fundo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/30 pointer-events-none" />
      </nav>

      {/* Navegação bottom para mobile (alternativa) */}

      {/* <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 z-40">
        <div className="flex items-center justify-around py-2">
          {links.map(({ href, label, icon: Icon, color }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300
                  ${isActive ? `text-white` : "text-slate-400 hover:text-white"}
                `}
              >
                {isActive && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg opacity-20`}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon size={20} />
                  <span className="text-xs font-medium truncate max-w-[60px]">
                    {label}
                  </span>
                </div>

                {isActive && (
                  <div
                    className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${color} rounded-full`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav> */}
    </>
  );
}
