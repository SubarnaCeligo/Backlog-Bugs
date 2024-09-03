
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_21028_Paypal", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4425 TC_21028_Paypal", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connections in Homepage ***", async () => { });

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async () => { });

    await io.homePage.loadingTime()

    await io.homePage.click(selectors.flowBuilderPagePO.PAYPAL);
    test.step("*** clicked on PayPal adaptor ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "PayPal Connection");
    test.step("*** Name the PayPal Connection ***", async () => { });

    await expect(page.getByPlaceholder('PayPal connection').first()).toBeVisible();

    test.step("*** Verified  able to select PayPal   ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
  });
});
