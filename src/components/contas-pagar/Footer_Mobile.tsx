"use client";

export function FooterMobile() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 backdrop-blur-md z-50 md:hidden">
      {/* Brand Strip */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            © 2025 DCB - Distribuidora Cirúrgica Brasileira
          </p>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
