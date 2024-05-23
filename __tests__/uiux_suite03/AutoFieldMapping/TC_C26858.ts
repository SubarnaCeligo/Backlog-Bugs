import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C26858 Verify if message There are no new fields to auto-map is shown in case no more additional fields are suggested`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Env-All @Zephyr-IO-T5280 C26858 Verify There are no new fields to auto-map is shown in case no more additional fields are suggested`, async ({
    io,
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

    // Click on Auto-map fields button 2 times
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);
    await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP);

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "There are no new fields to auto-map.")
  });
});