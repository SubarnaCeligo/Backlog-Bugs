
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C60004_TC_C60005 Verify help texts and cross button for query parameters", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T23469 @Env-All TC_C60004 Verify help texts for required query parameters", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "MessageMedia");
    await (await io.homePage.findElementByDataTest('MessageMedia')).click();
    await test.step(
      "*** Selected Message Media as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Messaging"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get sent messages detail"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    const helpTextButton = await page.locator(
      selectors.exportsPagePO.QUERY_PARAMETERS_ROW + " " +
      selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    await helpTextButton.first().click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const helpText1 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    expect(helpText1).toEqual(
      "Field helpEnd date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format Example: 2017-02-12T13:30:00.Was this helpful?"
    );
    await test.step(
      "*** Verified Helptext is present for end_date. ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.exportsPagePO.CLOSE_ICON_HELP_POPOVER_EXPORT);
    await helpTextButton.nth(1).click();
    const helpText2 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    expect(helpText2).toEqual(
      "Field helpStart date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format Example: 2017-02-10T13:30:00.Was this helpful?"
    );
    await test.step(
      "*** Verified Helptext is present for start_date. ***",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified help texts for required query parameters",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T23470 @Env-All TC_C60005 Verify cross button for optional query parameters", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "MessageMedia");
    await (await io.homePage.findElementByDataTest('MessageMedia')).click();
    await test.step(
      "*** Selected Message Media as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Messaging"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get sent messages detail"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.connectionsPagePO.APPLICATION_NAME2, "q");
    test.step("*** Selecting Query parameter ***", async ()=>{});
    await io.assert.verifyElementToBeClickable(selectors.flowBuilderPagePO.DELETEBUTTON1);
    await io.homePage.click(
      selectors.flowBuilderPagePO.DELETEBUTTON1
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified cross button for optional query parameters",
      async ()=>{}
    );
  });
});
