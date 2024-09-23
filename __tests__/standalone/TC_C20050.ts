
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C20050", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4416 TC_C20050", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Clicking on create connections ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** selecting Netsuite ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    
    await io.homePage.loadingTime();

    test.step("*** Giving connection name *** ", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_20050");

    test.step("*** Clicking on Header 1 *** ", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_1, "Header1");

    test.step("*** Clicking on Header 2 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_2, "Header2");

    test.step("*** Clicking on Header 3 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_3, "Header3");

    test.step("*** Deleting the first key ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_1, "");

    var val2 = await io.homePage.getElement(selectors.flowBuilderPagePO.HEADER_NAME2);
    const lastRowValue = await val2.inputValue();

    await expect(lastRowValue).toEqual("Header3");
    test.step("*** The last row is not getting deleted when trying to delete the key of first row in REST connection ***", async ()=>{});
  });
});
