
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C99589 from "@testData/HTTPConnector2.0/TC_C99589.json";

test.describe("TC_C99589", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25617 @Env-All TC_C99589 Verify PKCE & Code challenge method fields are showing in flow level", async ({ io, page }) => {
    const flowId = await io.createResourceFromAPI(TC_C99589, "FLOWS");
    await test.step("Created Flow " + TC_C99589.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    // Navigate to flowspage
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.EDITRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    const codeChallengeMethod = await page.locator(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_LABEL
    );
    expect(codeChallengeMethod).toBeVisible();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified PKCE & Code challenge method fields should be visible in flow level ***",
      async () => {}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T25618 @Env-All TC_C99590 Verify PKCE & Code challenge method fields are showing in integration level", async ({ io, page }) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    // Navigate to flowspage
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CONNECTIONS,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.myAccountPagePO.INVITE_USER_BUTTON,
      2
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    const codeChallengeMethod = await page.locator(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_LABEL
    );
    expect(codeChallengeMethod).toBeVisible();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified PKCE & Code challenge method fields should be visible in integgration level ***",
      async () => {}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
