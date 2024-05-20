import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testdata from "./testdata.json";

test.describe(`C14612 Verify Template name is displayed in URL while installing template`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Zephyr-IO-T3846 @Env-IAQA @Priority-P2 C14612 Verify Template name is displayed in URL while installing template`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Marketplace");
    await io.marketplacePage.fill(
      '[placeholder="Search marketplace"]',
      "3PL Central - NetSuite"
    );
    await io.marketplacePage.clickByText("Preview");
    await io.marketplacePage.clickByText("Install now");
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON,
      0
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    let conn = await io.api.getCall("v1/connections");
    let connsId = conn.find((conn) => conn.name === "http3hn4d");
    console.log("connsId", connsId._id);

    await io.connectionPage.click(`[data-value="${connsId._id}"]`);

    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("NETSUITE 347 CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId)
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.INSTALL);

    await io.homePage.loadingTime();

    let URL = await page.url();

    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    let result = false;

    if(URL.includes("/3plcentral-Netsuite/")) {
        result = true;
    }
    await expect(result).toBeTruthy();
  });
});
