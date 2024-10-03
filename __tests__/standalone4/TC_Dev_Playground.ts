import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Dev_Playground | Golden ", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C27651 @Env-All @Zephyr-IO-T2296", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Playground");
    test.step("Clicked on Dev playground button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.playgroundPO.LIST_OF_ITEM_OPTIONS,
      "Handlebars editor"
    );

    await io.homePage.clickButtonBasedOnLabelName(
      selectors.playgroundPO.LIST_OF_ITEM_OPTIONS,
      "Simple JSON record"
    );

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.JSON_TEXT);
    await io.assert.expectToBeTrue(data.length > 0, "Simple JSON record is displayed");
  });
});
