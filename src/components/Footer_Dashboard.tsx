'use client';

import React from 'react';
import {
  Github,
  Instagram,
  Linkedin,
} from 'lucide-react';

export function FooterDashboard() {
  return (
    <footer className="w-full mt-12 border-t border-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white bg-opacity-60 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        {/* Texto institucional */}
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} DCB Sistemas. Todos os direitos reservados.
        </p>

        {/* Ícones sociais */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
