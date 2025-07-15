import React, { useState } from "react";
import { X, Eye, EyeOff, Lock, Check, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/contexts/auth-context";
import api from "../axios";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswordsState {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  submit?: string;
}

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passwordData: PasswordData) => Promise<void>;
}

const ModalAlterarSenha: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState<ShowPasswordsState>({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (passwordData: PasswordData) =>
      api.post("/api/auth/change-password", {
        LOGIN: user?.cgc,
        SENHA: passwordData.newPassword,
      }),
    onSuccess: () => {
      setErrors({});
      onClose();
    },
    onError: (error: Error) => {
      setErrors({ submit: error.message });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória";
    } else if (formData.newPassword.length < 5) {
      newErrors.newPassword = "Nova senha deve ter pelo menos 5 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    mutation.mutate(formData);
  };

  const handleInputChange = (
    field: keyof PasswordData,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof ShowPasswordsState): void => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleClose = (): void => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    setShowPasswords({ current: false, new: false, confirm: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl border border-emerald-300/20 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-300/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Alterar Senha
              </h2>
              <p className="text-sm text-white/60">Mantenha sua conta segura</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 border border-emerald-300/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                placeholder="nova senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-4 py-3 bg-white/10 border border-emerald-300/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                placeholder="confirmar senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.submit}
            </p>
          )}

          {/* Password Requirements */}
          <div className="bg-emerald-500/10 border border-emerald-300/20 rounded-lg p-3">
            <p className="text-sm text-white/80 mb-2">Requisitos da senha:</p>
            <ul className="text-xs text-white/60 space-y-1">
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-emerald-400" />
                Mínimo de 5 caracteres
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col column gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Alterando...
                </>
              ) : (
                <>Alterar</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlterarSenha;
