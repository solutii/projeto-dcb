import Image from "next/image";
import { LogOut } from "lucide-react";
import { MenuNavegacao } from "@/components/Menu";
import { MenuNavegacaoMobile } from "./Menu_Mobile";

interface HeaderProps {
  titulo: string;
}

export function Header({titulo}: HeaderProps) {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        h-20 md:h-32 lg:h-40
        overflow-hidden
        bg-transparent
        backdrop-blur-sm
      "
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/imagem-cabecalho.jpg"
          alt="Fundo do Dashboard"
          className="object-cover object-center"
          priority
          fill
          quality={100}
        />
      </div>

      {/* Conteúdo do header */}
      <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-8 lg:px-12 w-full">
        {/* Logotipo */}
        <div className="flex items-center group">
          <Image
            src="/logo-dcb.png"
            alt="Logo DCB"
            width={220}
            height={80}
            className="h-auto w-auto max-h-[70px] md:max-h-[90px] transition-all duration-300 group-hover:scale-105 filter brightness-45 contrast-120"
            priority
            quality={100}
          />
          <span className="ml-4 text-white font-bold text-xl md:text-2xl lg:text-3xl border-l-2 border-emerald-400 pl-4 hidden md:block">
            {titulo}
          </span>
        </div>

        {/* Menu de navegação */}
        <div className="hidden lg:flex">
          <MenuNavegacao />
        </div>

        {/* Área direita (widgets) */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Menu mobile - só aparece em telas menores que md */}
          <div className="flex md:hidden">
            <MenuNavegacaoMobile />
          </div>

          {/* Status Online - só aparece em md+ */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 hidden md:flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              Sistema Online
            </span>
          </div>

          {/* Botão Logout - só aparece em md+ */}
          <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/40 transition-all hidden md:block">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Efeito de brilho sutil */}
    </header>
  );
}
