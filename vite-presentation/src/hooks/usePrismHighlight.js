import { useEffect } from 'react';

export const usePrismHighlight = () => {
  useEffect(() => {
    // Ensure Prism is available and highlight all code blocks
    const highlightCode = () => {
      if (window.Prism && window.Prism.highlightAll) {
        window.Prism.highlightAll();
      }
    };

    // Try multiple times to ensure highlighting works
    highlightCode();
    
    const timer1 = setTimeout(highlightCode, 50);
    const timer2 = setTimeout(highlightCode, 200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  });
};