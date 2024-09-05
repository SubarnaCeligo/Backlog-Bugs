import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C35763_HTTPConnection_VerifyAFE_AbsoluteUrl", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    await(await page.locator(selectors.basePagePO.RESOURCES)
    ).hover();
  });
  test("@Zephyr-IO-T5518 @Env-All TC_C35763_HTTPConnection_VerifyAFE_AbsoluteUrl", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP);
    await io.homePage.click(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE);
    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_AUTHORIZE);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ABSOLUTEURL_HANDLER, 1);

    var resourcesAvailable = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    test.step("*** Verifying the resources are available in handlebars template *** ", async ()=>{});
    await io.assert.expectToContainValue("unencrypted",String(resourcesAvailable), "");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});
  });
});
