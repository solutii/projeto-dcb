import React, { useState } from "react";
import {
  ChevronDown,
  Settings,
  User,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";

export function MenuConfiguracoes() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Aqui você pode adicionar sua lógica de logout
    console.log("Logout realizado");
    // Exemplo: window.location.href = '/login';
  };

  return (
    <div className="relative">
      {/* Botão do menu */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium hidden md:block">Admin</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <>
          {/* Overlay para fechar o menu quando clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Conteúdo do menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {/* Informações do usuário */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  Administrador
                </p>
                <p className="text-xs text-gray-500">admin@empresa.com</p>
              </div>

              {/* Opções do menu */}
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <User className="w-4 h-4" />
                  Meu Perfil
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Bell className="w-4 h-4" />
                  Notificações
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Shield className="w-4 h-4" />
                  Segurança
                </button>
              </div>

              {/* Divisor */}
              <div className="border-t border-gray-100 my-1" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
