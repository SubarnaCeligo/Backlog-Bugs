import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C30659_AFE2.0_settings", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T4611 @Env-All TC_C30659_AFE2.0_settings", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await page.keyboard.type("HTTP");
    await page.keyboard.press("Enter");
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await page.keyboard.type("HTTP ZENDESK CONNECTION");
    await io.homePage.clickByText("HTTP ZENDESK CONNECTION");
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "HTTP_TEST"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await io.assert.expectToContainValue("settings",paste, "");
    await io.assert.expectToContainValue("integration",paste, "");
    await io.assert.expectToContainValue("flow",paste, "");
    await io.assert.expectToContainValue("connection",paste, "");
    await io.assert.expectToContainValue("import",paste, "");
    await io.assert.expectToContainValue("flowGrouping",paste, "");
  });
});
