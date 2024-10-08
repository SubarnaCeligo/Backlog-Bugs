import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29297", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2267 @Env-All  TC_C29297", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await test.step("*** Navigating to   Flows page ***",()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await test.step("Selecting application",()=>{});
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);
    await io.homePage.click('[data-test="createFromScratch"]')
    await io.homePage.click(selectors.connectionsPagePO.NAME_INPUT);
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Webhook");
    await io.homePage.click(selectors.flowBuilderPagePO.VERIFICATION);
    await io.homePage.click(selectors.connectionsPagePO.BASIC);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKUSERNAME, "test");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKPASSWORD, "gfhgf");
    await io.homePage.click("button[aria-label='Generate URL']");
    await test.step(" Clicking on Generate URL button",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click('[aria-label="Copy to clipboard"]');
    await test.step(" Clicking on Copy to Clipboard button",()=>{});
    var txt = await io.homePage.isVisible('text="URL copied to clipboard."');
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("Verified the Generate token button is replaced with icon button with tool tip",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
