
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("HTTP_standalone_imports", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T9562 TC_C30761_HTTP_Linkheader_NextPageUrl", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Page generator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    test.step("*** Clicking on type of Export ***", async ()=>{});

    let conn = HTTP[0]["connectionId"];
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_EXPORT");
    test.step("*** Renaming the Export ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Clicking on the Http Method ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("*** Clicking on the Http GET Method ***", async ()=>{});
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "/customers");
    test.step("*** Providing relative URL ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.loadingTime()
    test.step("*** Export type ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LIMITTYPE);
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on API use paging dropdown ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    test.step("*** Opening Paging methods ***", async ()=>{});
    await io.homePage.click("[data-value='linkheader']");
    test.step("*** Selecting Link header Method ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Saving the export ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on API use paging dropdown ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    await io.homePage.click("[data-value='url']");
    test.step("*** Changing the Paging method to Next Page URL ***", async ()=>{});
    await io.homePage.fillWebPage("[data-test='http.paging.urlPath']", "next");
    test.step("*** Providing the Relative path for Next Page URL ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    var test2 = await io.homePage.getTextFromElement( selectors.flowBuilderPagePO.SKIP, "Next page URL");
    await io.assert.expectToBeTrue(test2, "");
    test.step("*** Verifying whether Next Page URL paging method is saved or not ***", async ()=>{});
  });
});
