"use client";
import Image from "next/image";
import { ChevronRight, Heart, Shield, Activity } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentTime: Date;
}

export function SidebarHeader({
  isCollapsed,
  toggleCollapse,
}: SidebarHeaderProps) {
  const { data: userData, isLoading: userLoading } = useUserData();

  return (
    <>
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
              <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
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

      {!isCollapsed && (
        <div className="px-6 py-4 border-b border-emerald-300/10">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-300/20">
            <div className="flex flex-col space-y-1">
              <span className="text-cyan-300 text-xs font-medium block">
                Bem-vindo,
              </span>

              <span className="text-cyan-300 text-sm block">
                {userLoading
                  ? "Carregando usuário..."
                  : userData?.nome ?? "Usuário"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
