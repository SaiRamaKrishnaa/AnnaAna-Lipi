const textToBinary = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
};

const binaryToText = (binary: string): string => {
  if (binary.length === 0) return "";
  if (binary.length % 8 !== 0) {
    // This error is a safeguard but should not be hit if called from the updated decode function.
    throw new Error("Invalid binary sequence: length must be a multiple of 8.");
  }
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substring(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
};

export const encode = (text: string, wordZero: string, wordOne: string): string => {
  if (!text) return '';
  if (!wordZero || !wordOne) throw new Error("Custom words cannot be empty.");
  if (wordZero === wordOne) throw new Error("Custom words for 0 and 1 must be different.");

  const binary = textToBinary(text);
  return binary
    .split('')
    .map(bit => (bit === '0' ? wordZero : wordOne))
    .join(' ');
};

export const decode = (encodedText: string, wordZero: string, wordOne: string): string => {
  if (!encodedText.trim()) return '';
  if (!wordZero || !wordOne) throw new Error("Custom words cannot be empty.");
  if (wordZero === wordOne) throw new Error("Custom words for 0 and 1 must be different.");

  let remainingText = encodedText.trim();
  let binary = '';

  while (remainingText.length > 0) {
    let matchFound = false;
    
    // Prioritize checking for the longer word first to correctly handle cases 
    // where one word is a prefix of the other (e.g., "a" and "aa").
    if (wordOne.length > wordZero.length) {
        if (remainingText.startsWith(wordOne)) {
            binary += '1';
            remainingText = remainingText.substring(wordOne.length).trimStart();
            matchFound = true;
        } else if (remainingText.startsWith(wordZero)) {
            binary += '0';
            remainingText = remainingText.substring(wordZero.length).trimStart();
            matchFound = true;
        }
    } else { // wordZero is longer or they are the same length
        if (remainingText.startsWith(wordZero)) {
            binary += '0';
            remainingText = remainingText.substring(wordZero.length).trimStart();
            matchFound = true;
        } else if (remainingText.startsWith(wordOne)) {
            binary += '1';
            remainingText = remainingText.substring(wordOne.length).trimStart();
            matchFound = true;
        }
    }

    if (!matchFound) {
      const errorWord = remainingText.split(/[\s\n\t]+/)[0] || remainingText;
      throw new Error(`Invalid sequence found starting with: "${errorWord}". Please use only "${wordZero}" and "${wordOne}".`);
    }
  }

  // Handle partial binary strings for a smoother live preview.
  // Only process full 8-bit bytes and ignore any incomplete ones at the end.
  const parsableLength = Math.floor(binary.length / 8) * 8;
  if (parsableLength === 0) {
      return ""; // Not enough bits for even one character.
  }

  const parsableBinary = binary.substring(0, parsableLength);
  return binaryToText(parsableBinary);
};