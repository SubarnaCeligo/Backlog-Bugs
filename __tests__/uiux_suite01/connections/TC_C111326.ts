import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`TC_C111326_C111327`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All @Zephyr-IO-T8851 TC_C111326_C111327", async ({io, page}) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.click(selectors.basePagePO.CLOSE);  
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
    await io.assert.verifyElementIsDisplayed(
      selectors.mappings.MAPPER2DOT0PO.PREVIEW,
      "Fetch Preview is not displayed"
    )
    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON,1);
    await page.getByText("Standard").click();
    await page.getByText("Handlebars expression", { exact: true }).click();
    await io.homePage.loadingTime()
    await page.getByText("Please select", { exact: true }).click();
    await page.getByText("Do nothing", { exact: false })

  });
});
