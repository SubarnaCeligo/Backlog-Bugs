
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C28177_HttpExport_Nextpagetoken.json";

test.describe("TC_C28177_C28179_HttpExport_Nextpagetoken", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9551 @Zephyr-IO-T9552 @Env-All TC_C28177_C28179 Verify Add to URI or Body message for HTTP Export with Next Page Token", async ({io,page}, testInfo) => {
    test.step("*** Verification for Nextpage token method for paging  ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as export ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = HTTP[0]["connectionId"];

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();

    test.step("*** Choosing the HTTP ZD connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C28177_HttpExport_Nextpagetoken");
    test.step("*** Naming the PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on API use paging dropdown ***", async ()=>{});
    await io.homePage.fillWebPage( selectors.flowBuilderPagePO.SKIP, "token");
    test.step("*** Clicking on NextPage token  ***", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.LICENSEBODY, "Add {{export.http.paging.token}} to either the relative URI or HTTP request body to complete the setup.");
  });
});
