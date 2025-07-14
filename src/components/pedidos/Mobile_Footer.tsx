"use client";

import { useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function MobileFooter() {
  const [activeTab, setActiveTab] = useState("social");

  const socialLinks = [
    {
      id: "instagram",
      icon: Instagram,
      label: "Instagram",
      url: "https://www.instagram.com",
      gradient: "from-purple-500 via-pink-500 to-orange-500",
      color: "text-pink-500",
    },
    {
      id: "facebook",
      icon: Facebook,
      label: "Facebook",
      url: "https://www.facebook.com",
      gradient: "from-blue-600 to-blue-700",
      color: "text-blue-600",
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com",
      gradient: "from-blue-700 to-blue-800",
      color: "text-blue-700",
    },
  ];

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      label: "Email",
      value: "contato@empresa.com",
      action: "mailto:contato@empresa.com",
      color: "text-green-600",
    },
    {
      id: "phone",
      icon: Phone,
      label: "Telefone",
      value: "+55 (11) 99999-9999",
      action: "tel:+5511999999999",
      color: "text-blue-600",
    },
    {
      id: "address",
      icon: MapPin,
      label: "Endereço",
      value: "São Paulo, SP",
      action: "https://maps.google.com",
      color: "text-red-600",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 backdrop-blur-md z-50 md:hidden">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200/50">
        {/* REDES SOCIAIS */}
        <button
          onClick={() => setActiveTab("social")}
          className={`
            flex-1 px-3 py-1.5 text-xs font-medium transition-all duration-300
            ${
              activeTab === "social"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
        >
          Redes Sociais
        </button>

        {/* CONTATOS */}
        <button
          onClick={() => setActiveTab("contact")}
          className={`
            flex-1 px-3 py-1.5 text-xs font-medium transition-all duration-300
            ${
              activeTab === "contact"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
        >
          Contato
        </button>
      </div>

      {/* Content Area */}
      <div className="px-3 py-2">
        {activeTab === "social" && (
          <div className="flex justify-around items-center">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <div
                    className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                    bg-gradient-to-tr ${link.gradient} text-white shadow-lg
                    group-hover:shadow-xl group-hover:shadow-current/25
                  `}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium transition-colors duration-300 ${link.color}`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-2">
            {contactInfo.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={contact.id}
                  href={contact.action}
                  target={contact.id === "address" ? "_blank" : undefined}
                  rel={
                    contact.id === "address" ? "noopener noreferrer" : undefined
                  }
                  className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
                >
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    bg-gray-100 ${contact.color} group-hover:scale-110 transition-all duration-300
                  `}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">
                      {contact.label}
                    </p>
                    <p className="text-xs text-gray-600">{contact.value}</p>
                  </div>
                  {contact.id === "address" && (
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Brand Strip */}
      <div className="bg-gray-900 text-white px-3 py-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">© 2024 Sua Empresa</p>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
