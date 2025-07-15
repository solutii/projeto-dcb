// components/MenuNavegacao.tsx
import Link from "next/link";
import { LayoutDashboard, FileText, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export function MenuNavegacao() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-blue-500 to-blue-700",
    },
    {
      href: "/tabela-contas-pagar",
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

  return (
    <nav className="flex items-center gap-3 mt-4 md:mt-0">
      {links.map(({ href, label, icon: Icon, color }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`
              group relative flex items-center px-5 py-3 rounded-2xl text-sm md:text-base font-semibold
              transition-all duration-500 ease-out transform hover:scale-105 active:scale-95
              backdrop-blur-md border border-white/20 overflow-hidden
              ${
                isActive
                  ? `text-white bg-gradient-to-br ${color} shadow-2xl shadow-black/30`
                  : "text-white/90 bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-white/20 hover:via-white/15 hover:to-white/5 hover:border-white/40 hover:shadow-xl hover:shadow-black/20"
              }
            `}
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Partículas flutuantes para item ativo */}

            {/* Glow effect interno */}
            <div
              className={`
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${isActive ? "opacity-30" : ""}
              bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10
            `}
            />

            <Icon
              className={`
              w-5 h-5 mr-3 transition-all duration-300 relative z-10
              ${
                isActive
                  ? "text-white drop-shadow-lg"
                  : "text-white/80 group-hover:text-white group-hover:drop-shadow-md"
              }
            `}
            />

            <span className="relative z-10 tracking-wide">{label}</span>

            {/* Indicador de página ativa - mais elaborado */}

            {/* Reflexo glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-2xl pointer-events-none" />

            {/* Borda interna brilhante */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300" />
          </Link>
        );
      })}

      {/* Efeito de fundo decorativo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 blur-3xl opacity-30" />
    </nav>
  );
}
