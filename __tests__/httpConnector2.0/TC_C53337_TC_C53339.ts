
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C53337 TC_C53339 Verify Mandatory Query parameters are pre-loaded in disabled state and error message when no value is provided in 3PL Export", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17116 @Zephyr-IO-T17118 @Env-All TC_C53337 TC_C53339 Verify Mandatory Query parameters are pre-loaded in disabled state and error message when no value is provided in 3PL Export", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    test.step("*** Selected 3plcentral as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "3PL CENTRAL CONNECTION"
    );
    await test.step(
      "*** Choosing the desired 3pl central connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Billing"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Customer"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    const disable = await page.locator(selectors.connectionsPagePO.APPLICATION_NAME0);
    await expect(disable).toBeDisabled();
    await test.step(
      "Verified Mandatory Query parameter is pre-loaded and it should be in disable state",
      async ()=>{}
    );
    const errorMessage = (await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE)).toString();
    await io.assert.expectToContainValue("A value must be provided", errorMessage, "Error message is not displayed");
    await test.step(
      "Verified if Error message is shown when no value is provided for mandatory query params",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
