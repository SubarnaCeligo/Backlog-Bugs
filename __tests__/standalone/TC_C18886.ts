
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C18886", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1688 TC_C18886", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    //Export
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);
    test.step("*** Selected NS as the adaptor ***", async ()=>{});
    
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.VERIFICATION, "secret_url");
    test.step("*** Selected secret_url as verification ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.VERIFICATION, "secret_url");
    test.step("*** Selected secret_url as verification ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.exportsPagePO.WEBHOOKTOKEN, "ABC");
    test.step("*** Enter webhook token ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.waitForTimeout(4000);
    test.step("*** Click on generate url ***", async ()=>{});

    const generatedUrl = await (await io.homePage.getElement(selectors.flowBuilderPagePO.WEBHOOKPUBLICURL)).inputValue();
    await expect(generatedUrl).toContain("ABC");

    await io.homePage.fillWebPage(selectors.exportsPagePO.WEBHOOKTOKEN, "DEF");
    test.step("*** Enter webhook token ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    await page.waitForTimeout(2000);
    test.step("*** Click on generate url ***", async ()=>{});

    const reGeneratedUrl = await (await io.homePage.getElement(selectors.flowBuilderPagePO.WEBHOOKPUBLICURL)).inputValue();
    await expect(reGeneratedUrl).toContain("DEF");
  });
});
