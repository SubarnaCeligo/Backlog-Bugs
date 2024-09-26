
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95655", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    io.homePage.loadingTime();
  });
  test("TC_C95655 @Env-All @Zephyr-IO-T2346", async ({io,page}, testInfo) => {
    // When trying to modify the URL of the integrator.io, notification pop-up is coming with the message containing ""It seems that your internet connection may be offline""
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    let Main_url = await io.homePage.getCurrentUrl();

    Main_url = await Main_url.slice(0, Main_url.lastIndexOf("/"));
    var Exports_page = Main_url;

    Exports_page += "/exports";
    Exports_page = Exports_page.toString();
    await io.homePage.navigateTo(Exports_page);
    await io.homePage.loadingTime();
    var Imports_page = Main_url;
    Imports_page += "/imports";
    Exports_page = Imports_page.toString();
    await io.homePage.navigateTo(Imports_page);
    await io.homePage.loadingTime();

    const isNotificationVisible = await io.homePage.isVisible(selectors.basePagePO.NOTIFICATION_ID);
    if (isNotificationVisible) {
      let alertText =
        "It seems that your internet connection may be offline. Check your connection, then reload. If you continue to have problems test.afterEach verifying that your connection is working, try signing out and signing back in to integrator.io.";
  
      var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, alertText);
      await io.assert.expectToBeFalse(result, "");
    }
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
