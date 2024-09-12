import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C44645", () => {
  test.beforeEach(async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T6766 @Env-All TC_C44645", async ({io,page}, testInfo) => {
    test.step("Navigating Connection Page", async ()=>{});
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Click on create Connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
    test.step("Selected Amazon Seller Central as application and connection page opened.", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.APITYPE);
    const dropDown1 = await io.homePage.getTextFromElement(selectors.connectionsPagePO.AMAZONSP, "Selling Partner API (SP-API)");
    const dropDown2 = await io.homePage.getTextFromElement(selectors.connectionsPagePO.AMAZONHYBRID, "Hybrid Selling Partner API (SP-API and MWS)");
    test.step("Validating the values getting displayed test.afterEach clicking the dropdown", async ()=>{});
    await io.assert.expectToBeTrue(dropDown1, "");
    await io.assert.expectToBeTrue(dropDown2, "");
  });
});
