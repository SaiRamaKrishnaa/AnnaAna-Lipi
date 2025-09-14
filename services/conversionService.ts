
const textToBinary = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
};

const binaryToText = (binary: string): string => {
  if (binary.length === 0) return "";
  if (binary.length % 8 !== 0) {
    throw new Error("Invalid input: does not correspond to a valid text sequence.");
  }
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
};

export const encode = (text: string, wordZero: string, wordOne: string): string => {
  if (!text) return '';
  if (!wordZero || !wordOne) throw new Error("Custom words cannot be empty.");
  const binary = textToBinary(text);
  return binary
    .split('')
    .map(bit => (bit === '0' ? wordZero : wordOne))
    .join(' ');
};

export const decode = (encodedText: string, wordZero: string, wordOne: string): string => {
  if (!encodedText.trim()) return '';
  if (!wordZero || !wordOne) throw new Error("Custom words cannot be empty.");

  const words = encodedText.trim().split(/\s+/);
  let binary = '';

  for (const word of words) {
    if (word === wordZero) {
      binary += '0';
    } else if (word === wordOne) {
      binary += '1';
    } else if (word) {
      throw new Error(`Invalid word found in input: "${word}". Please use only "${wordZero}" and "${wordOne}".`);
    }
  }

  return binaryToText(binary);
};
