
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C28174.json";

test.describe("TC_C28174_Page_Pagination_Validations", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9548 @Env-All TC_C28174_Page_Pagination_Validations", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    var conn = HTTP.pageGenerators[0].qa__export._connectionId;
      
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();

    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0); 
      await io.homePage.loadingTime();
    }

    test.step("*** Choosing the desired connection ***", async ()=>{});

    test.step("*** Choosing the desired connection ***", async ()=>{});
    // await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Square HTTP Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "page");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.LICENSEBODY, "Add {{export.http.paging.page}} to either the relative URI or HTTP request body to complete the setup.");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURL, HTTP.pageGenerators[0].qa__export.http.relativeURI);

    const text = await io.homePage.getText(selectors.flowBuilderPagePO.LICENSEBODY) as unknown as string;
    await io.assert.expectToBeFalse(text.includes("Add {{export.http.paging.page}} to either the relative URI or HTTP request body to complete the setup."), '');
  });
});
