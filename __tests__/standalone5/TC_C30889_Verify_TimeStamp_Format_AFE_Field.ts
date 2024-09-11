import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("TC_C30889_Verify_TimeStamp_Format_AFE_Field", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5512 @Env-All TC_C30889_Verify_TimeStamp_Format_AFE_Field", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});

    var conn = FTP[0]["connectionId"];
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);

    test.step("***Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.loadingTime();
    test.step("*** Clicking on Directory path handle bar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);
    await io.homePage.loadingTime()
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{timestamp format 'Asia/Calcutta'}}");
    
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    test.step("*** Verifying Timestamp Format in AFE Fields ***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
    await io.assert.expectToContainValue("+05:30",String(data), "");
  });
});
