import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C27330 - Verify the Page processor import form has 'Override child record trace key template' field", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2815|Verify the Page processor import form has 'Override child record trace key template' field", async ({io,page}) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.basePagePO.ADD_NEW_RESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.fill('[id="connections-dropdown"]','ftp connection');   
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
await test.step(
      "*** Clicking on add new import and selecting adaptor as FTP ***"
, async ()=>{});
    test.step("*** Selecting FTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "FTP import"
    );
    test.step("*** Writing import name ***", async ()=>{});

    await io.homePage.click(
      selectors.basePagePO.SAVE
    );

    await io.homePage.click(
      selectors.flowBuilderPagePO.NS_SS2
    );
    test.step("*** Selecting YES in oneToMany Field ***", async ()=>{});

    await io.homePage.click(
      selectors.importPagePO.ADVANCED
    );
    await io.homePage.loadingTime();

    let ans = await page.locator("[for='traceKeyTemplate']").textContent();
    await expect(ans).toEqual(`Override child record trace key template`);
await test.step(
      "*** 'Override child record trace key template' Field is present ***"
, async ()=>{});
  });
});
