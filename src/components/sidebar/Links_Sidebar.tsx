"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, LayoutDashboard, FileText, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface LinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  shadowColor: string;
}

interface SidebarLinksProps {
  isCollapsed: boolean;
}

export function SidebarLinks({ isCollapsed }: SidebarLinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const links: LinkItem[] = [
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
  ];

  return (
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

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

            {isCollapsed && (
              <div className="absolute left-20 bg-gradient-to-r from-slate-800/95 to-emerald-800/95 backdrop-blur-xl text-white px-4 py-3 rounded-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-500 border border-emerald-300/20 shadow-2xl whitespace-nowrap z-50">
                <div className="flex items-center space-x-2">
                  <span>{label}</span>
                </div>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-slate-800 to-emerald-800 rotate-45 border-l border-b border-emerald-300/20" />
              </div>
            )}

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
  );
}
