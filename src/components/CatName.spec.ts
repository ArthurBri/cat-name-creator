import { shallowMount, VueWrapper } from "@vue/test-utils";
import CatName from "./CatName.vue";

const props = {
  name: "Samosa",
};

let wrapper: VueWrapper<any> | null = null;
beforeEach(() => {
  wrapper = shallowMount(CatName, { props });
});

describe("CatName", () => {
  it("should display as many letter div as letter count", async () => {
    expect(wrapper?.findAll(".letter").length).toBe(6);

    await wrapper?.setProps({ name: "Bil" });
    expect(wrapper?.findAll(".letter").length).toBe(3);

    await wrapper?.setProps({ name: "Chip" });
    expect(wrapper?.findAll(".letter").length).toBe(4);
  });

  it("should display all letters in uppercase", async () => {
    const displayedLetters = wrapper
      ?.findAll(".letter")
      .map((letter) => letter.text());
    expect(displayedLetters).toStrictEqual(["S", "A", "M", "O", "S", "A"]);
  });

  it("should display remove letter button if name length > 1", async () => {
    const nameLengthWrapper = wrapper?.find(".name-length-wrapper");
    expect(nameLengthWrapper?.find(".remove-letter").classes("invisible")).toBe(
      false
    );
  });

  it("should display remove letter button if name length = 1", async () => {
    await wrapper?.setProps({ name: "A" });
    const nameLengthWrapper = wrapper?.find(".name-length-wrapper");
    expect(nameLengthWrapper?.find(".remove-letter").classes("invisible")).toBe(
      true
    );
  });

  it("should not display remove letter button on non-last letter", async () => {
    const letterWrappers = wrapper?.findAll(".letter-wrapper") || [];

    const firstLetter = letterWrappers?.[0];
    expect(firstLetter.find(".remove-letter").exists()).toBeFalsy();

    const thirdLetter = letterWrappers?.[2];
    expect(thirdLetter.find(".remove-letter").exists()).toBeFalsy();
  });

  it("should not display remove letter button if only one letter", async () => {
    await wrapper?.setProps({ name: "X" });
    const letter = wrapper?.find(".letter-wrapper");
    expect(letter?.find(".remove-letter").exists()).toBeFalsy();
  });

  it("should emit letter removing when remove letter button click", async () => {
    await wrapper?.find(".remove-letter").trigger("click");
    expect(wrapper?.emitted().removeLastLetter).toBeTruthy();
  });

  it("should display a button which add letter", async () => {
    expect(wrapper?.find(".add-letter").exists()).toBeTruthy();
  });

  it("should emit letter adding when add letter button click", async () => {
    await wrapper?.find(".add-letter").trigger("click");
    expect(wrapper?.emitted().addLetter).toBeTruthy();
  });

  it("should replace input greater than 1 character by the previous character", async () => {
    const letter = wrapper?.find(".letter");
    if (letter) {
      letter.element.innerHTML = "Ba";
    }
    await letter?.trigger("input");
    expect(letter?.text()).toEqual("B");
  });

  it("should emit lockLetter event when letter is empty", async () => {
    const letter = wrapper?.find(".letter");
    if (letter) {
      letter.element.innerHTML = "";
    }
    await letter?.trigger("input");
    expect(wrapper?.emitted().lockLetter).toBeTruthy();
  });

  it("should emit lockLetter event when letter is set and different from original", async () => {
    const letter = wrapper?.find(".letter");
    if (letter) {
      letter.element.innerHTML = "B";
    }
    await letter?.trigger("input");
    expect(wrapper?.emitted().lockLetter).toBeTruthy();

    if (letter) {
      letter.element.innerHTML = "S";
    }
    await letter?.trigger("input");
    expect(wrapper?.emitted().lockLetter).toHaveLength(1);
  });

  it("should display fixed letter in dark pink", async () => {
    const letter = wrapper?.find(".letter");
    await wrapper?.setProps({ fixedLetters: { 0: "B" } });
    setTimeout(() => {
      expect(letter?.classes()).toContain("text-pink-dark");
    }, 500);
  });

  it("should display not fixed letter in gray 800", async () => {
    const letter = wrapper?.find(".letter");
    await wrapper?.setProps({ fixedLetters: { 1: "B" } });
    expect(letter?.classes()).toContain("text-gray-800");
  });

  it("should display the name length", async () => {
    const nameLength = wrapper?.find(".name-length");
    expect(nameLength?.text()).toEqual("6 lettres");

    await wrapper?.setProps({ name: "Chip" });
    expect(nameLength?.text()).toEqual("4 lettres");
  });
});
