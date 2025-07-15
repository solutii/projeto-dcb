"use client";

import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await login(email, password); // agora retorna User | null

      if (userData) {
        toast("Login realizado com sucesso", {
          description: "Bem-vindo(a) de volta!",
          duration: 3000,
          icon: "✅",
          style: {
            backgroundColor: "#38a169",
            color: "#fff",
          },
        });
        router.push("/dashboard");
      } else {
        toast("Erro ao realizar login", {
          description: "Verifique suas credenciais e tente novamente.",
          duration: 5000,
          icon: "❌",
          style: {
            backgroundColor: "#e53e3e",
            color: "#fff",
          },
        });
      }
    } catch {
      toast("Erro ao realizar login", {
        description: "Ocorreu um erro inesperado. Tente novamente.",
        duration: 5000,
        icon: "❌",
        style: {
          backgroundColor: "#e53e3e",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background com imagem e efeitos */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/image.png"
            alt="Background"
            fill
            priority
            quality={100}
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover object-center brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-black/40"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Texto do lado esquerdo */}
      <div className="hidden md:flex items-center justify-center fixed left-0 top-0 h-full w-1/2 z-10 p-8">
        <div className="text-white max-w-md transition-all duration-1000 ease-out">
          <div className="text-7xl font-bold text-right mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            DESDE 1978
          </div>
          <div className="text-3xl text-right font-extralight italic opacity-90 animate-fade-in">
            Servindo em{" "}
            <strong className="font-bold text-emerald-300">Alto Nível</strong> a
          </div>
          <div className="text-3xl text-right font-extralight italic opacity-90 animate-fade-in-delayed">
            <span className="text-cyan-300">comunidade médico hospitalar</span>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Container do formulário */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="min-h-screen flex items-center justify-center p-8 w-full md:w-1/2 lg:w-2/5">
          <div className="w-full max-w-md transition-all duration-700 hover:scale-105">
            {/* Formulário com header e logo */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-400"></div>
              {/* Header com logo incluso */}
              <div className="relative bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-purple-600/20 backdrop-blur-sm pt-8 pb-4 px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-t-3xl"></div>

                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src="/favicon_dcb.png"
                      alt="Logo"
                      width={64}
                      height={64}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                  <h2 className="text-emerald-950 text-4xl font-bold font-orbitron">
                    DCB
                  </h2>
                  <p className="text-emerald-950 text-xl font-semibold">
                    Distribuidora Cirúrgica Brasileira
                  </p>
                </div>

                {/* Ornamentos */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-sm animate-pulse delay-500"></div>
              </div>

              {/* Formulário */}
              <form className="p-8" onSubmit={handleSubmit}>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white transition-all duration-500 hover:scale-110">
                    Bem-vindo
                  </h1>
                  <p className="text-white/80 text-sm mt-1">
                    Acesse sua conta para continuar
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90 uppercase tracking-wide">
                      E-mail
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-emerald-400" />
                      </div>
                      <input
                        type="number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-white/90 uppercase tracking-wide">
                        Senha
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-white/70 hover:text-emerald-300 flex items-center transition-colors duration-200"
                      >
                        {showPassword ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" /> Ocultar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" /> Mostrar
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-emerald-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-400 focus:ring-emerald-400 border-white/20 rounded bg-white/5 transition-all duration-200"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
                      >
                        Lembrar-me
                      </label>
                    </div>

                    <button
                      type="button"
                      className="text-sm text-white/70 hover:text-emerald-300 transition-colors duration-200 hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Acessando...
                      </>
                    ) : (
                      <>
                        Entrar <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
