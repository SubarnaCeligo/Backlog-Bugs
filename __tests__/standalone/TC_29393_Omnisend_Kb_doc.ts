
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_29393_Omnisend_Kb_doc", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4551 TC_29393_Omnisend_Kb_doc", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.OMNISEND);
    await io.homePage.loadingTime();
    test.step("*** clicked on Omnisend adaptor ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Omnisend Connection");
    await io.homePage.loadingTime();
    test.step("*** Name the Omnisend connection ***", async ()=>{});

    var kbDOc = await io.homePage.isVisible("[href*='/articles/4404620597915-Set-up-a-connection-to-Omnisend']");
    await expect(kbDOc).toBeTruthy();
    test.step("*** Verifying  KB doc hyperlink is visible   ***", async ()=>{});
    await io.assert.verifyElementToBeClickable("[href*='/articles/4404620597915-Set-up-a-connection-to-Omnisend']")
    test.step("*** Verifying  KB doc hyperlink is clickable   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
