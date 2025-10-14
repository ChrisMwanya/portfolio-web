'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Plus, X } from 'lucide-react';
import type { FloatingCTAProps } from './type';

export function FloatingCTA({ email, whatsappNumber }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, '_blank');
    setIsOpen(false);
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options Menu */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-3 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600"
          aria-label="Contacter via WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">WhatsApp</span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmail}
          className="flex items-center gap-3 rounded-full bg-blue-500 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-600"
          aria-label="Contacter par email"
        >
          <Mail className="h-5 w-5" />
          <span className="font-medium">Email</span>
        </button>
      </div>

      {/* Main CTA Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu de contact'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-background" />
        )}
      </button>
    </div>
  );
}
