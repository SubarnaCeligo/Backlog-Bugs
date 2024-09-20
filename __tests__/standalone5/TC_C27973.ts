
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("HTTP_standalone_import_label_Test_cases", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T9945 @Env-All TC_C27973_verify the label Where would you like to transfer from.", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);
    test.step("*** Choosing the transfer files into destination ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");

    await io.homePage.loadingTime();
    
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    var rest = await io.homePage.getTextFromElement("[data-test='Where would you like the files transferred?']", "Where would you like the files transferred?");
     await io.assert.expectToBeTrue(rest, "");
    test.step("*** Verifying whether the Where would you like the files transferred? is displayed  ***", async ()=>{});
    var ret = await io.homePage.getTextFromElement("[for='http.requestMediaType']", "Override request media type");
    await io.assert.expectToBeTrue(ret, "");
    test.step("*** Verifying whether the Override request media type is displayed or not   ***", async ()=>{});
    var het = await io.homePage.getTextFromElement("[id='mui-component-select-/http/requestMediaType']", "Do not override");
     await io.assert.expectToBeTrue(het, "");
    test.step("*** Verifying whether the Do not override  is displayed or not   ***", async ()=>{});
    var res = await io.homePage.isVisible("[id='http.requestMediaType']>div>div>button>svg");
    await io.assert.expectToBeTrue(res, "");
  });
});
