
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C103667", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C103667 @Env-All @Zephyr-IO-T25643", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    //Amazon Redshift
    await io.homePage.loadingTime();
    const guide = await page.locator(selectors.basePagePO.LINK);
    const link = await guide.getAttribute("href");
    await io.assert.expectToContainValue( "https://docs.celigo.com/hc/en-us/articles/7694139932699-Set-up-a-connection-to-Amazon-Redshift", link,"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    test.step("*** clicked on close ***", async ()=>{});
    await io.homePage.loadingTime();

    //Amazon Redshift(REST API)
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONREDSHIFTREST);
    await test.step("*** Selected Amazon Redshift (REST API) as the adaptor ***",async ()=>{}
    );
    await io.homePage.loadingTime();
    const guide1 = await page.locator(
      selectors.basePagePO.LINK
    );
    const link1 = await guide1.getAttribute("href");
    await io.assert.expectToContainValue( "https://docs.celigo.com/hc/en-us/articles/360042875872-Set-up-a-connection-to-Amazon-Redshift", link1,"");

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    test.step("*** clicked on close ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
