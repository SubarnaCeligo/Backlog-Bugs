import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C63190", () => {
  test("@Env-All @Zephyr-IO-T21666 C63190 If the internet goes offline, then a proper error message should display instead of unknown error", async ({io, page, context}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.goToMenu("Resources","Exports");
    await io.homePage.goToMenu("Resources","Imports");
    await io.homePage.loadingTime();

    // Simulating network offline event. Works only on chromium based browsers
    const client = await context.newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1, 
    });

    await page.goBack();
    await page.waitForTimeout(1000);

    const notification = await page.$("#notification");
    const text = await notification.innerText();
    expect(text).toContain("It seems that your internet connection may be offline. Check your connection, then reload. If you continue to have problems after verifying that your connection is working, try signing out and signing back in to integrator.io.");
  });
});