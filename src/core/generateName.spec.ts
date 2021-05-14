import generateName from "./generateName";
import { getAlphabet, getVowels, getVowelsCount } from "../utils";

describe("Generate name", () => {
  it("should return a string of given character numbers", () => {
    expect(generateName(3)).toHaveLength(3);
    expect(generateName(5)).toHaveLength(5);
    expect(generateName(7)).toHaveLength(7);
    expect(generateName(20)).toHaveLength(20);
  });

  it("should return an vowels average of 6/26 letters of the final word", () => {
    expect((getVowelsCount(generateName(100000)) / 100000).toFixed(2)).toEqual(
      (getVowels().length / getAlphabet().length).toFixed(2)
    );
  });

  it("should throws an error when requested vowels are greater than available vowels", () => {
    expect(() => generateName(5, 6)).toThrow(
      "Vowels count must be lower or equal to name characters count."
    );
  });

  it(`should throws an error when fixed + requested vowels is  
        is lower than requested vowels count`, () => {
    expect(() =>
      generateName(6, 5, { 0: "b", 1: "a", 2: "n", 3: "a", 4: "n", 5: "a" })
    ).toThrow(
      "Not enough vowels available. Try to remove consonants or increase name length."
    );
  });

  it("should return a name with a given number of vowels", () => {
    expect(getVowelsCount(generateName(5, 0))).toBe(0);
    expect(getVowelsCount(generateName(5, 2))).toBe(2);
    expect(getVowelsCount(generateName(5, 5))).toBe(5);
    expect(getVowelsCount(generateName(50, 50))).toBe(50);
  });

  it("should not generate lowercase letters at fixed letters indexed", () => {
    const name = generateName(6, undefined, {
      0: "b",
      1: "a",
      2: "n",
      3: "a",
      4: "n",
      5: "a",
    });
    expect(name).toEqual("banana");
    expect(name.length).toEqual(6);

    const nameTwo = generateName(6, undefined, { 0: "b", 1: "o", 2: "o" });
    expect(nameTwo.slice(0, 3)).toEqual("boo");
    expect(nameTwo.length).toEqual(6);

    const nameThree = generateName(8, undefined, {
      0: "c",
      2: "a",
      5: "z",
      7: "v",
    });
    const nameThreeFixed =
      nameThree[0] + nameThree[2] + nameThree[5] + nameThree[7];
    expect(nameThreeFixed).toEqual("cazv");
    expect(nameThree.length).toEqual(8);
  });

  it("should not generate uppercase letters at fixed letters indexed", () => {
    const name = generateName(6, undefined, {
      0: "B",
      1: "A",
      2: "N",
      3: "A",
      4: "N",
      5: "A",
    });
    expect(name).toEqual("banana");
    expect(name.length).toEqual(6);

    const nameTwo = generateName(6, undefined, { 0: "B", 1: "O", 2: "O" });
    expect(nameTwo.slice(0, 3)).toEqual("boo");
    expect(nameTwo.length).toEqual(6);

    const nameThree = generateName(8, undefined, {
      0: "C",
      2: "A",
      5: "Z",
      7: "V",
    });
    const nameThreeFixed =
      nameThree[0] + nameThree[2] + nameThree[5] + nameThree[7];
    expect(nameThreeFixed).toEqual("cazv");
    expect(nameThree.length).toEqual(8);
  });
});
