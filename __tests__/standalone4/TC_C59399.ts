
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C59399", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1919 TC_C59399", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Data loader");
    await io.homePage.loadingTime();
    test.step("***Clicking on the Data Loader Export***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.DATALOADEREXPORT);
    test.step("*** Selecting Filetype ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");

    //Label
    var label = await io.homePage.getText(selectors.exportsPagePO.LABEL);
    await io.assert.expectToContainValue("Sample file (that would be parsed) *", String(label), "");
    await test.step("*** Verified Label should be changed to “Sample file (that would be parsed)” ***",async ()=>{}
    );

    await io.homePage.click(selectors.exportsPagePO.HELPICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var title = await io.homePage.getText(selectors.exportsPagePO.TITLE);
    await io.assert.expectToContainValue("Sample file (that would be parsed)",String(title), "");
    await test.step("*** Verified Help text title should be changed to “Sample file (that would be parsed)” ***",async ()=>{}
    );

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked On Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked On Discard Changes ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
