/**
 * Custom text splitter utility to mimic GSAP SplitText behavior safely without external club plugins.
 * Transforms text into nested spans for character, word, and line level animations.
 */
export function splitTextElement(element, options = { type: 'words,chars', maskLines: true }) {
  if (!element) return null;
  const originalText = element.textContent;
  element.setAttribute('data-original-text', originalText);
  
  const words = originalText.trim().split(/\s+/);
  element.innerHTML = '';

  const charSpans = [];
  const wordSpans = [];

  words.forEach((wordText, wordIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.style.marginRight = '0.28em';

    if (options.type.includes('chars')) {
      const chars = wordText.split('');
      chars.forEach((char) => {
        const charWrapper = document.createElement('span');
        charWrapper.className = 'split-char-wrapper';
        charWrapper.style.display = 'inline-block';
        if (options.maskLines) {
          charWrapper.style.overflow = 'hidden';
          charWrapper.style.verticalAlign = 'top';
        }

        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.style.display = 'inline-block';
        charSpan.textContent = char;

        charWrapper.appendChild(charSpan);
        wordSpan.appendChild(charWrapper);
        charSpans.push(charSpan);
      });
    } else {
      wordSpan.textContent = wordText;
    }

    element.appendChild(wordSpan);
    wordSpans.push(wordSpan);
  });

  return {
    chars: charSpans,
    words: wordSpans,
    revert: () => {
      element.innerHTML = originalText;
    }
  };
}
