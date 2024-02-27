import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117471 Verify the Celigo AI behaviour for IA's", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C117471 Verify the Celigo AI behaviour for IA's", async ({ io, page }) => {
    await io.homePage.goToMenu("Home");
    await io.flowBuilder.clickByText('BigCommerce - NetSuite');
    await io.flowBuilder.clickByText('BigCommerce Customer to NetSuite Customer Add/Update [QA_Store_1]');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_NAME, 'FlowGroup');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX, 4);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX, 5);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_UNASSIGNED);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
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