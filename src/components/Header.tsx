import Image from "next/image";
import { LogOut } from "lucide-react";

export function HeaderDashboard() {
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
      {/* Imagem de fundo com efeito dinâmico */}
      <div className="absolute inset-0">
        <Image
          src="/imagem-cabecalho.jpg"
          alt="Fundo do Dashboard"
          className="object-cover object-center"
          priority
          fill
          quality={100}
          style={{
            transform: "scale(1.01)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Gradiente com opacidade reduzida */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-teal-800/30 to-cyan-900/20" />

      {/* Ruído sutil e menos intenso */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay" />

      {/* Container do conteúdo */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-8 lg:px-12">
        {/* Logotipo com filtro para escurecer */}
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
            Painel de Controle
          </span>
        </div>

        {/* Área direita (widgets) */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 hidden md:flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              Sistema Online
            </span>
          </div>

          <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Efeito de brilho sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 opacity-80"></div>
    </header>
  );
}
