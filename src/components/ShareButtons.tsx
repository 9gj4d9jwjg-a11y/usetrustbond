"use client";

import { Linkedin, MessageCircle, Link2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ShareButtons({ title = "Gostaria de compartilhar este projeto interessante." }: { title?: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${title} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-serif text-[#1F1F1F] font-medium">Compartilhe o projeto:</span>
      <div className="flex gap-2">
        <a 
          href={links.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-[#00000015] flex items-center justify-center text-[#6E6E6E] hover:bg-[#4A5D23] hover:text-white hover:border-[#4A5D23] transition-colors"
          title="Compartilhar no LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a 
          href={links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-[#00000015] flex items-center justify-center text-[#6E6E6E] hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-colors"
          title="Compartilhar no X"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a 
          href={links.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-[#00000015] flex items-center justify-center text-[#6E6E6E] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
          title="Compartilhar no WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
        <button 
          onClick={copyToClipboard}
          className="w-10 h-10 rounded-full border border-[#00000015] flex items-center justify-center text-[#6E6E6E] hover:bg-[#1F1F1F] hover:text-white hover:border-[#1F1F1F] transition-colors"
          title="Copiar link"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
      </div>
    </div>
  );
}
