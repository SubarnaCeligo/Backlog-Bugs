import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Test to validate testmode and job object are visible for all the filter editors like input filter, output filter, branching", () => {

  test("@Zephyr-IO-T37844 @Env-All @Priority-P2 Test to validate testmode and job object are visible for all the filter editors like input filter, output filter, branching", async ({io,page}) => {
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
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.OUTPUTFILTER);
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true,');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "export"');
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "demo int_DND");
    await io.homePage.loadingTime();
    await io.homePage.clickByText('demo int_DND');
    await io.homePage.loadingTime();
    await io.homePage.clickByText('DND flows');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INPUTFILTER);
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"testMode": true,');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"flowExecutionGroupId"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"startedAt"');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"type": "import"');
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "demo int_DND");
    await io.homePage.loadingTime();
    await io.homePage.clickByText('demo int_DND');
    await io.homePage.loadingTime();
    await io.homePage.clickByText('DND flows');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, '"job"');
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});

