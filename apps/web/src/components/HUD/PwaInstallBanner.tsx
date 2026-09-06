import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { sound } from '../../lib/sound';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    sound.playClick();
    if (!deferredPrompt) {
      alert('To install Spidey Tracker on mobile: Tap Share in your browser and select "Add to Home Screen".');
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setShowBanner(false);
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner && !deferredPrompt) return null;

  return (
    <div className="bg-[#102B40] border-y-2 border-[#8DEBFF] px-3 py-1.5 flex items-center justify-between z-40 text-xs font-mono shadow-[0_0_15px_rgba(141,235,255,0.3)]">
      <div className="flex items-center space-x-2">
        <Smartphone className="w-4 h-4 text-[#8DEBFF] animate-bounce" />
        <div>
          <span className="font-arcade text-[#8DEBFF] font-bold">SPIDEY TRACKER APP READY</span>
          <span className="text-[10px] text-[#8BA9B8] hidden sm:inline ml-2">
            Install standalone app for native mobile experience
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1 bg-[#EF4B45] hover:bg-[#FF625A] text-white font-arcade font-bold text-[11px] uppercase border border-white flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>INSTALL APP</span>
        </button>

        <button
          onClick={() => setShowBanner(false)}
          className="p-1 hover:bg-[#07111F] text-[#8BA9B8] hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
