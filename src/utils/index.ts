const vowels = "aeiouy";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const consonants = "bcdfghjklnpqrstvwxz";

type GetVowels = () => string[];
export const getVowels: GetVowels = () => vowels.split("");

type GetConsonants = () => string[];
export const getConsonants: GetConsonants = () => consonants.split("");

type GetAlphabet = () => string[];
export const getAlphabet: GetAlphabet = () => alphabet.split("");

type GetRandomLetter = () => string;
export const getRandomLetter: GetRandomLetter = () =>
  getAlphabet()[Math.floor(Math.random() * getAlphabet().length)];

type GetRandomVowel = () => string;
export const getRandomVowel: GetRandomVowel = () =>
  getVowels()[Math.floor(Math.random() * getVowels().length)];

type GetRandomConsonant = () => string;
export const getRandomConsonant: GetRandomConsonant = () =>
  getConsonants()[Math.floor(Math.random() * getConsonants().length)];

type GetVowelsCount = (name: string) => number;
export const getVowelsCount: GetVowelsCount = (name) =>
  name
    .split("")
    .reduce(
      (count, letter) =>
        getVowels().includes(letter) ||
        getVowels().includes(letter.toLowerCase())
          ? ++count
          : count,
      0
    );

type GetConsonantCount = (name: string) => number;
export const getConsonantsCount: GetConsonantCount = (name) =>
  name
    .split("")
    .reduce(
      (count, letter) =>
        getConsonants().includes(letter) ||
        getConsonants().includes(letter.toLowerCase())
          ? ++count
          : count,
      0
    );

type ShuffleWord = (letters: string) => string;
export const shuffleWord: ShuffleWord = (letters) =>
  letters
    .split("")
    .sort((_) => 0.5 - Math.random())
    .join("");
