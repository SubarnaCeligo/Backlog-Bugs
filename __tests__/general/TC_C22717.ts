
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22717", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });

  test("TC_C22717", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await test.step("*** Clicked on Marketplace ***",()=>{});
    await io.homePage.clearTextValue("//input[@type='text']");
    await io.homePage.fillWebPage("//input[@type='text']", "Salesforce");
    await io.homePage.clickButtonByIndex('[role="button"] .MuiListItemIcon-root', 1);
    await test.step("*** Clicking on By Type dropdown ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click('[data-test="Template"]');
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Salesforce tile ***",()=>{});
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    let flowDetails = await page.locator(
      selectors.basePagePO.EXPANDED_FLOWSTAB
    );
    await flowDetails.isVisible();
    const expanded_flowsTab = await io.homePage.isVisible(selectors.basePagePO.EXPANDED_FLOWSTAB);
    await io.assert.expectToBeTrue(expanded_flowsTab, "");

    const nonExpanded_integrationsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_INTEGRATIONSTAB);
    await io.assert.expectToBeTrue(nonExpanded_integrationsTab, "");

    const nonExpanded_ExportsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_EXPORTSTAB);
    await io.assert.expectToBeTrue(nonExpanded_ExportsTab, "");

    const nonExpanded_ImportsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_IMPORTSTAB);
    await io.assert.expectToBeTrue(nonExpanded_ImportsTab, "");

    const nonExpanded_ConnectionsTab = await io.homePage.isVisible(selectors.basePagePO.NONEXPANDED_CONNECTIONSTAB);
    await io.assert.expectToBeTrue(nonExpanded_ConnectionsTab, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
