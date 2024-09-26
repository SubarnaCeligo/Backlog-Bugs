
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import BigCommerce from "@testData/STANDALONE/BigCommerce.json";

test.describe("TC_29984_Verify_AFE2.0_Model_with_PagePaging", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9938 TC_29984_Verify_AFE2.0_Model_with_PagePaging", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = BigCommerce[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP BIGCOMMERCE ");
    await io.homePage.clickByTextByIndex(conn, 0, {exact: false});
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired BigCommerce connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_29984_AutomationStandalone_BigCommerce HTTP Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/v2/products?page={{export.http.paging.page}}");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on Paging Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "page");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});
    test.step("*** Verifying whether the proper method selected ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.OVERRIDEPAGENUM, "1");
    test.step("*** Adding Override Page Number ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async ()=>{});
    await io.homePage.loadingTime();
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await io.assert.expectToContainValue( "previous_page", String(paste),"");
    await io.assert.expectToContainValue( "full_response",String(paste), "");
    await io.assert.expectToContainValue( "connection", String(paste),"");
    await io.assert.expectToContainValue( "export", String(paste),"");
    await io.assert.expectToContainValue( "settings",String(paste),"");
    test.step("***  Verified Model Format in AFE 2.0 For Page Paging   ***", async ()=>{});
  });
});
