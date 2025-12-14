'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import type { FloatingCTAProps } from './type';

export function FloatingCTA({
  email,
  whatsappNumber,
  phoneNumber,
}: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, '_blank');
    setIsOpen(false);
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
    setIsOpen(false);
  };

  const handlePhone = () => {
    window.location.href = `tel:${phoneNumber}`;
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
        {/* Phone Button */}
        <button
          onClick={handlePhone}
          className="flex items-center gap-3 rounded-full bg-purple-500 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-purple-600"
          aria-label="Appeler"
        >
          <Phone className="h-5 w-5" />
          <span className="font-medium">Appeler</span>
        </button>

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
        className={`group flex items-center gap-2 rounded-full px-5 py-3 shadow-xl transition-all hover:scale-105 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu de contact'}
      >
        {isOpen ? (
          <>
            <X className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">Fermer</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-5 w-5 text-background" />
            <span className="text-sm font-semibold text-background">
              Me contacter
            </span>
          </>
        )}
      </button>
    </div>
  );
}
