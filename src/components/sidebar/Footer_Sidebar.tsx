"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const socialLinks = [
    {
      href: "https://www.instagram.com/dcb_distribuidora/",
      icon: FaInstagram,
      className:
        "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
      shadow: "hover:shadow-pink-500/30",
    },
    {
      href: "https://www.facebook.com/distribuidoracirurgicabrasileira/",
      icon: FaFacebook,
      className:
        "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      shadow: "hover:shadow-blue-500/30",
    },
    {
      href: "https://www.linkedin.com/company/dcb-distribuidora-cirurgica-brasileira",
      icon: FaLinkedin,
      className:
        "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      shadow: "hover:shadow-blue-500/30",
    },
  ];

  return (
    <div className="p-4 border-t border-emerald-300/10">
      {!isCollapsed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ href, icon: Icon, className, shadow }, i) => (
              <Link
                key={i}
                target="_blank"
                href={href}
                className={`w-10 h-10 bg-gradient-to-r ${className} rounded-xl flex items-center justify-center text-white transition-all duration-500 shadow-lg ${shadow} hover:scale-110 active:scale-95 group`}
              >
                <Icon
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
          <div className="text-center">
            <p className="text-emerald-200/80 text-sm font-medium">
              DCB Distribuidora
            </p>
            <p className="text-emerald-200/60 text-xs">
              Cirúrgica Brasileira • Desde 1978
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ href, icon: Icon, className, shadow }, i) => (
              <Link
                key={i}
                target="_blank"
                href={href}
                className={`w-8 h-8 bg-gradient-to-r ${className} rounded-lg flex items-center justify-center text-white transition-all duration-500 shadow-lg ${shadow} hover:scale-110 active:scale-95`}
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
        </div>
      )}
    </div>
  );
}
