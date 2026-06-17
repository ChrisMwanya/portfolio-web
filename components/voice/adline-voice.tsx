/* eslint-disable */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react';

export const AdlineVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'fr-FR';

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          transcriptRef.current = currentTranscript;
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          // When listening stops, if we have a transcript, send it to the AI
          if (transcriptRef.current.trim()) {
            handleSendToAI(transcriptRef.current);
          }
        };
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const transcriptRef = useRef('');

  function speak(text: string, onEndCallback?: () => void) {
    if (!synthRef.current) return;

    // Stop any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';

    // Try to find a nice female French voice
    const voices = synthRef.current.getVoices();
    const frVoices = voices.filter((v) => v.lang.startsWith('fr'));
    // Google voices usually sound better if available
    const preferredVoice =
      frVoices.find((v) => v.name.includes('Google')) || frVoices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.pitch = 1.1; // Slightly higher pitch for a friendly assistant
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    synthRef.current.speak(utterance);
  }

  async function handleSendToAI(text: string) {
    setTranscript('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      if (data.text) {
        speak(data.text);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      speak(
        "Désolée, je n'ai pas pu contacter le serveur. La clé API manque peut-être.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Votre navigateur ne supporte pas la reconnaissance vocale.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // If Ad'line is speaking, stop her so user can talk
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      setTranscript('');

      if (!hasIntroduced) {
        setHasIntroduced(true);
        speak(
          "Bonjour, je suis Ad'line, l'assistante vocale de Christian. Que voulez-vous savoir sur lui ?",
          () => {
            try {
              recognitionRef.current.start();
              setIsListening(true);
            } catch (e) {
              console.error(e);
            }
          },
        );
      } else {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="relative z-50 flex items-center">
      {/* Transcript / AI state indicator popup */}
      {(isListening || isLoading || isSpeaking || transcript) && (
        <div className="absolute left-0 top-full mt-3 w-[250px] animate-fade-in-up rounded-2xl border border-white/20 bg-white/80 p-4 text-sm shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/80">
          {isListening && (
            <div className="flex flex-col gap-2">
              <span className="animate-pulse font-semibold text-main">
                Ad&apos;line écoute...
              </span>
              <p className="italic text-muted-foreground">
                {transcript || 'Parlez maintenant...'}
              </p>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center gap-2 text-amber-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="font-semibold">Ad&apos;line réfléchit...</span>
            </div>
          )}
          {isSpeaking && !isLoading && (
            <div className="flex items-center gap-2 text-green-500">
              <Volume2 className="h-4 w-4 animate-pulse" />
              <span className="font-semibold">Ad&apos;line parle...</span>
            </div>
          )}
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={isSpeaking ? stopSpeaking : toggleListening}
        className={`group relative ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isListening
            ? 'bg-red-500 text-white'
            : isSpeaking
              ? 'bg-green-500 text-white'
              : 'bg-main text-white hover:bg-amber-600'
        }`}
        aria-label={isSpeaking ? 'Arrêter de parler' : "Parler à Ad'line"}
      >
        {/* Ripple effects when active */}
        {(isListening || isSpeaking) && (
          <>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-current opacity-40"></span>
            <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-current opacity-60 blur-md"></span>
          </>
        )}

        {isListening ? (
          <Square className="h-4 w-4" fill="currentColor" />
        ) : isSpeaking ? (
          <Square className="h-4 w-4" fill="currentColor" />
        ) : (
          <Mic className="h-5 w-5 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
