import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Test to validate testmode and job object are visible for transaformation2.0 and mapper2.0", () => {

  test("@Zephyr-IO-T37847 @Env-All @Priority-P2 Test to validate testmode and job object are visible for transaformation2.0 and mapper2.0 ", async ({io,page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "demo int_DND");
    await io.homePage.loadingTime();
    await io.homePage.clickByText('demo int_DND');
    await io.homePage.loadingTime();
    await io.homePage.clickByText('DND flows');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.homePage.addStep("*** Clicked on Add data processor button to add transformations ***");
    await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
    await io.homePage.addStep("*** Opened transformation rules ***");
    await io.homePage.clickByText("Rules 2.0");
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER);
    await page.keyboard.type("{{testMode");
    await io.homePage.clickByText("testMode");
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});

