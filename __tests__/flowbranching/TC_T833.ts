import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T833 Verify user is able to edit/delete the Related lists in Salesforce Real time Export", () => {
  test("@Epic-IO-71413 @Priority-P2 @Zephyr-IO-T833 @Env-All TC_T833 Verify user is able to delete the Related lists in Salesforce Real time Export", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.APPLICATION);
    await io.flowBuilder.clickByTextByIndex("Salesforce", 0);
    await io.homePage.loadingTime();
    let realTimeData = await page.getByText("Listen for real-time data from source application").nth(0);
    await realTimeData.waitFor({state:'attached', timeout: 500000});
    await io.flowBuilder.clickByText('Listen for real-time data from source application');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES);
    await io.flowBuilder.clickByTextByIndex("SF Realtime", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.clickByTextByIndex("TC_T833 SalesForceConnection", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_RELATED_LIST);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_NEW_RELATED_LIST);
    await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.BRANCH_NAME_INPUT, 'test' , 4);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SELECTED);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    let elementArray = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.BRANCH_NAME_INPUT)).toString();
    let element = elementArray.split(',');
    expect(element[5]).toBe('test');
    await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.BRANCH_NAME_INPUT, 'test2' , 4);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SELECTED);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    elementArray = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.BRANCH_NAME_INPUT)).toString();
    element = elementArray.split(',');
    expect(element[5]).toBe('test2');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SELECTED);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.assert.verifyElementNotBeFound(selectors.integrationPagePO.OPEN_ACTIONS_MENU);
  });
});
