"use client";

import { Key, LogOut } from "lucide-react";
import { logoutClient } from "@/lib/logout";
import { useState } from "react";
import ModalAlterarSenha from "./Modal_Alterar_Senha";

interface SidebarActionsProps {
  isCollapsed: boolean;
  expandSidebar: () => void;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SidebarActions({
  isCollapsed,
  expandSidebar,
}: SidebarActionsProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handlePasswordChange = async (passwordData: PasswordChangeData) => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar senha");
      }
    } catch (error) {
      throw error;
    }
  };

  const actions = [
    {
      icon: Key,
      label: "Alterar Senha",
      color: "text-blue-400",
      onClick: () => {
        if (isCollapsed) {
          expandSidebar();
          setTimeout(() => {
            setIsPasswordModalOpen(true);
          }, 300); // tempo da animação
        } else {
          setIsPasswordModalOpen(true);
        }
      },
    },
    {
      icon: LogOut,
      label: "Fazer Logout",
      color: "text-red-400",
      onClick: logoutClient,
    },
  ];

  return (
    <div className="px-4 pb-4 space-y-3 mt-auto">
      {actions.map(({ icon: Icon, label, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className={`group relative flex items-center w-full rounded-2xl text-sm font-semibold
            transition-all duration-500 ease-out transform hover:scale-[1.02] active:scale-95
            overflow-hidden backdrop-blur-sm
            ${isCollapsed ? "px-4 py-4 justify-center" : "px-6 py-4"}
            text-white/70 hover:text-white bg-gradient-to-r from-white/5 via-white/2 to-transparent hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:shadow-xl border border-white/5 hover:border-white/20
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <div className="relative z-10 flex items-center">
            <Icon
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${color}`}
            />
          </div>

          {!isCollapsed && (
            <div className="ml-4 relative z-10 flex-1 text-left">
              <span className="tracking-wide font-medium">{label}</span>
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

          <div className="absolute inset-0 rounded-2xl border border-emerald-300/5 group-hover:border-emerald-300/20 transition-all duration-500" />
        </button>
      ))}

      <ModalAlterarSenha
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
}
