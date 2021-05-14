import {
  getRandomVowel,
  getRandomConsonant,
  getVowelsCount,
  getConsonantsCount,
  shuffleWord,
  getVowels,
  getAlphabet,
} from "../utils";

type GenerateName = (
  length: number,
  vowelsCount?: number,
  fixedLetters?: { [key: number]: string }
) => string;
const generateName: GenerateName = (length, vowelsCount, fixedLetters) => {
  if (vowelsCount !== undefined && vowelsCount > length) {
    throw new Error(
      "Vowels count must be lower or equal to name characters count."
    );
  }

  const fixedVowelsCount = fixedLetters
    ? getVowelsCount(Object.values(fixedLetters).join())
    : 0;
  const fixedConsonantsCount = fixedLetters
    ? getConsonantsCount(Object.values(fixedLetters).join())
    : 0;

  const totalVowelsCount =
    vowelsCount !== undefined ? vowelsCount : fixedVowelsCount;
  const remainingLetters = length - fixedConsonantsCount - totalVowelsCount;

  if ((vowelsCount || 0) > length - fixedConsonantsCount) {
    throw new Error(
      "Not enough vowels available. Try to remove consonants or increase name length."
    );
  }

  if (vowelsCount !== undefined && fixedVowelsCount > vowelsCount) {
    throw new Error("Too many vowels used. Try to remove fixed vowels.");
  }

  const VOWELS_PERCENTAGE = getVowels().length / getAlphabet().length;
  const vowels = [...Array(totalVowelsCount - fixedVowelsCount || 0)].map(
    getRandomVowel
  );

  const generatedLetters = () =>
    Math.random() > VOWELS_PERCENTAGE || vowelsCount !== undefined
      ? getRandomConsonant()
      : getRandomVowel();

  const nameLetters = [
    ...vowels,
    ...[...Array(remainingLetters)].map(generatedLetters),
  ];
  const nameWithoutFixedLetters = shuffleWord(nameLetters.join(""));

  return fixedLetters
    ? Object.keys(fixedLetters)
        .reduce(
          (acc, letterIndex) =>
            Number(letterIndex) >= acc.length
              ? [...acc, fixedLetters[Number(letterIndex)]]
              : [
                  ...acc.slice(0, Number(letterIndex)),
                  fixedLetters[Number(letterIndex)],
                  ...acc.slice(Number(letterIndex), acc.length),
                ],
          nameWithoutFixedLetters.split("")
        )
        .join("")
        .toLowerCase()
    : nameWithoutFixedLetters;
};

export default generateName;
