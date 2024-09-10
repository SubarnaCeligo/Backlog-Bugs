import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22640_TC_22651_verification_of_exports_field_in_cloning.json";

test.describe("TC_C22640_TC_C22651", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigate to Home Page ***", () => { });
  });
  test("@Zephyr-IO-T2256 @Env-All TC_C22640_TC_C22651", async ({ io, page }, testInfo) => {
    var exp;
    exp = await io.createExportViaApi(FTP.DataExportStaging);
    var exportId = exp._id;
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await test.step("*** clicked on connection button", () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    var txt = selectors.basePagePO.LAST_UPDATED_BUTTON + " span"

    if (txt == "sorted ascending")
      await io.homePage.click(selectors.basePagePO.LAST_UPDATED_BUTTON);

    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);

    await io.homePage.isPageLoaded();
    var textBox = await page.locator(
      selectors.flowBuilderPagePO.RENAME + " input"
    ).getAttribute("type");
    await io.assert.expectToBeValue(textBox, "text", "");

    var env_label = await io.homePage.getTextFromElement(selectors.basePagePO.CLONE_ENV_TXT, "Environment");
    await io.assert.expectToBeTrue(env_label, "");
    var prod = await (await page.locator(selectors.homePagePO.PRODUCTION + " button")
    ).getAttribute("role");
    await io.assert.expectToBeValue(prod, "radio", "");
    var sandbox = await (await page.locator(selectors.homePagePO.SANDBOX+ " button")
    ).getAttribute("role");
    await io.assert.expectToBeValue(sandbox, "radio", "");

    var ariaExpandedExport = await (await page.locator(selectors.basePagePO.CLONE_EXP_MENU_BAR)
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaExpandedExport, "true", "");
    var ariaConnExpand = await page.locator(
      selectors.basePagePO.NONEXPANDED_CONNECTIONSTAB
    ).getAttribute("aria-expanded");
    await io.assert.expectToBeValue(ariaConnExpand, "false", "");

    var cloneBtn = await (await page.locator(selectors.basePagePO.CLONE_BTN)
    ).getAttribute("type");
    await io.assert.expectToBeValue(cloneBtn, "button", "");

    await io.api.deleteExportViaAPI(exportId);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
