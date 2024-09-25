
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_24250_KB_doc", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4450 TC_24250_KB_doc", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connections in Homepage ***", async () => { });

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MTEAM);
    test.step("*** clicked on Microsoft Teams adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Microsoft Teams Connection");
    test.step("*** Name the Microsoft Teams connection ***", async () => { });

    var kbDOc = await io.homePage.isVisible("[href*='/360057833071-Set-up-a-connection-to-Microsoft-Teams']");
    await io.assert.expectToBeTrue(kbDOc, "");
    test.step("*** Verifying  KB doc hyperlink is visible   ***", async () => { });


    await io.assert.verifyElementToBeClickable("[href*='/360057833071-Set-up-a-connection-to-Microsoft-Teams']")

    test.step("*** Verifying  KB doc hyperlink is clickable   ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async () => { });
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
  });
});
