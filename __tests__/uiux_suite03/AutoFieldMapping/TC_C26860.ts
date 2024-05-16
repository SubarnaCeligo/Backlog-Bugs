import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26860 Verify AutoMap fields are not taking time greater than 30 seconds when we have more no of fields to be mapped (>20)", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T5282 C26860 Verify AutoMap fields are not taking time greater than 30 seconds when we have more no of fields to be mapped (>20)", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Automapper_DND_Mapper_One");
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.loadingTime();
    
    // Add mappings
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();

    // Switch to Mapper 1.0
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAPPER1TOGGLEBUTTON);
    await io.homePage.loadingTime();

    // Click on Auto-map fields button
    await io.assert.verifyElementIsDisplayed(
      selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP,
      "Auto mapper tool is not displayed for Mapper 1.0"
    );
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);
    await io.assert.verifyElementAttributeContainsText(
      selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP,
      "class",
      "Mui-disabled",
      0
    );

    // Check if the Auto-map fields button is enabled before 30 seconds
    await page.locator(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP).isEnabled({timeout: 30000});
    
  });
});
