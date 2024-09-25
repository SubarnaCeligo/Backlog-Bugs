
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C28163_greaterthanmaxsizefield.json";

test.describe("TC_C28163_greaterthanmaxsizefield", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9547 @Env-All TC_C28163_greaterthanmaxsizefield Verify the max size of the fields for HTTP Export is increased to 128KB", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as export ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired ZD http connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C28163_greaterthanmaxsizefield");
    test.step("*** Naming the PageGenerator ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "GET");
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "tickets");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicking on httpbody button ***", async ()=>{});

    var data = HTTP[0]["body"];
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, data);

    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step("*** Clicking on save and close button in the http request body ***", async ()=>{});

    var typeselect = await page.locator(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close button at export level***", async ()=>{});

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, "The maximum size of the field: http.body in the Export document should be 65536 characters.")

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicking on httpbody button ***", async ()=>{});
    var data1 = HTTP[0]["body1"];
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, data1);
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
