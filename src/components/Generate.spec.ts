import { shallowMount, VueWrapper } from "@vue/test-utils";
import Generate from "./Generate.vue";

let wrapper: VueWrapper<any> | null = null;
beforeEach(() => {
  wrapper = shallowMount(Generate, { props: { length: 6 } });
});

describe("Generate", () => {
  it("should generate a name on button click", async () => {
    const generateSpy = spyOn(wrapper?.vm, "handleNameGeneration");
    await wrapper?.find(".generate-name").trigger("click");
    expect(generateSpy).toHaveBeenCalled();
  });
});
