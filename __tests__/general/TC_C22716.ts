import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22716", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });

  test("@Zephyr-IO-T2260 @Env-All  TC_C22716", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    const expanded_flowsTab = await io.homePage.isVisible(selectors.basePagePO.EXPANDED_FLOWSTAB);
    await io.assert.expectToBeTrue(expanded_flowsTab, "");
    var img1 = await page.locator(selectors.basePagePO.EXPANDED_FLOWSTAB);
    var img2 = await img1.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img2, "true", "");
    await test.step("*** Flows name dropdown is expanded  ***",()=>{});


    const nonExpanded_integrationsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_INTEGRATIONSTAB);
    await io.assert.expectToBeTrue(nonExpanded_integrationsTab, "");
    var img3 = await page.locator(selectors.basePagePO.NONEXPANDED_INTEGRATIONSTAB);
    var img4 = await img3.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img4, "false", "");
    await test.step("*** Integrations name dropdown is not expanded  ***",()=>{});

    

    const nonExpanded_ExportsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_EXPORTSTAB);
    await io.assert.expectToBeTrue(nonExpanded_ExportsTab, "");

    var ariaExpandedExport = await (await page.locator(selectors.basePagePO.NONEXPANDED_EXPORTSTAB)
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaExpandedExport, "false", "");

    var img5 = await page.locator(selectors.basePagePO.NONEXPANDED_IMPORTSTAB);
    var img6 = await img5.getAttribute("aria-expanded");
    await io.assert.expectToBeValue(img6, "false", "");
    await test.step("*** Import name dropdown is not expanded  ***",()=>{});

    var ariaConnExpand = await page.locator(
      selectors.basePagePO.NONEXPANDED_CONNECTIONSTAB
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaConnExpand, "false", "");
    await test.step("*** Verified The Connections field for clone page  ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

  
  });
});
