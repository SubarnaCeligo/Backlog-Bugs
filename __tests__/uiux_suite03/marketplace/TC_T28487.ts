import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T28487 Verify user is able to edit flow group in Template", () => {
  test("@Bug-IO-72269 @Priority-P2 @Zephyr-IO-T28487 Verify user is able to edit flow group in Template", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.delay(10000);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.homePagePO.SEARCH_INTEGRATION_WDIO);
    await io.homePage.fill(
      selectors.homePagePO.SEARCH_INTEGRATION_WDIO,
      "IO-T28487 FLOW GROUPING ISSUE DND"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("IO-T28487 FLOW GROUPING ISSUE DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('More');
    await io.flowBuilder.clickByText('Create flow group');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, 'FlowGroup');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    //Remove FLow Group
    await io.flowBuilder.clickByTextByIndex("FlowGroup", 0);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    await io.flowBuilder.click(selectors.flowGroupingPagePO.EDIT_FG);
    await io.flowBuilder.clickByTextByIndex("Delete flow group", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_DELETE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
  });
});