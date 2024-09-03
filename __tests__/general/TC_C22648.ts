import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22648", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2255 @Env-All TC_C22648_Verify_the_Clone_page", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.isPageLoaded();
    var rel = await page.$$(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await rel[1].click()
    await test.step("***Click on Action menu***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);
    await test.step("***Click on Clone ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var input2 = await io.homePage.isVisible(selectors.basePagePO.NAME_WDIO);
    await io.assert.expectToBeTrue(input2, "");
    await test.step("*** Verified The Name field for clone page   ***",()=>{});
    var input4 = await io.homePage.isVisible(selectors.basePagePO.INTEGRATION);
    await io.assert.expectToBeTrue(input4, "");
    await test.step("*** Verified The Integration field for clone page   ***",()=>{});
    var input3 = await io.homePage.isVisible(selectors.basePagePO.ENVIRONMENT);
    await io.assert.expectToBeTrue(input3, "");
    await test.step("*** Verified The Environment field for clone page  ***",()=>{});
    var input5 = await io.homePage.isVisible(selectors.flowGroupingPagePO.FLOWS);
    await io.assert.expectToBeTrue(input5, "");
    await test.step("*** Verified The Flows field for clone page   ***",()=>{});

    var input6 = await io.homePage.isVisible(selectors.basePagePO.EXPORTS);
    await io.assert.expectToBeTrue(input6, "");
    await test.step("*** Verified The Exports field for clone page  ***",()=>{});
    var ariaExpandedExport = await (await page.locator(selectors.flowGroupingPagePO.EXPORT)
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaExpandedExport, "false", "");

    var img1 = await page.locator(selectors.flowGroupingPagePO.IMPORT);
    var img2 = await img1.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img2, "false", "");
    await test.step("*** Import name dropdown is not expanded  ***",()=>{});

    var ariaConnExpand = await page.locator(
    selectors.basePagePO.NONEXPANDED_CONNECTIONSTAB
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaConnExpand, "false", "");
    await test.step("*** Verified The Connections field for clone page  ***",()=>{});

    var input8 = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.assert.expectToBeTrue(input8, "");
    await test.step("*** Verified The Clone flow button  for clone page  ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
