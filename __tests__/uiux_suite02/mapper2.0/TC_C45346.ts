import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45346 from "@testData/Mapper2.0/C45346.json";

test.describe("C45346 Verify the text displayed in the  Source field Drop down", () => {
  test("@Env-All @Zephyr-IO-T2396 C45346 Verify the text displayed in the  Source field Drop down", async ({
    io,
    page
  }) => {
    const id = await io.createResourceFromAPI(C45346, "FLOWS");
    await io.flowBuilder.loadingTime()
    await page.waitForSelector(selectors.basePagePO.ADD_DATA_PROCESSOR);
    const button = await page.$$(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await button[1].click();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await page.waitForTimeout(5000);
    await io.flowBuilder.click(selectors.connectionsPagePO.DATA_PANEL);
    await page.keyboard.type('{"name":"test"}');
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SOURCE_DROPDOWN_BUTTON);
    await io.flowBuilder.loadingTime()
    const sourceDropdown = await page.$(selectors.mappings.MAPPER2DOT0PO.SOURCE_DROPDOWN);
    const textContent = await sourceDropdown.innerText();
    expect(textContent).toContain("Type or select source field");
  });
});
