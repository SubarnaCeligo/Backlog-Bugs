import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import BigCommerce from "@testData/STANDALONE/BigCommerce.json";

test.describe("TC_C36039_VerifyDefaultPage_Set_0_InAFE", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9902 @Env-All TC_C36039_VerifyDefaultPage_Set_0_InAFE", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    var conn = BigCommerce[0]["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired BigCommerce connection ***", async ()=>{});

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_BigCommerce HTTP Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/v2/products?page={{export.http.paging.page}}");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    var type = await io.homePage.getTextFromElement(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "All - always export all data");
    await io.assert.expectToBeTrue(type, "");
    test.step("*** Verifying whether the proper drop-down selected or not ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    test.step("*** Clicking on Paging Method ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SKIP, "page");
    test.step("*** Selectting the desired Paging Method ***", async ()=>{});
    var pagination = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.SKIP, "Page number parameter");
    await io.assert.expectToBeTrue(pagination, "");
    test.step("*** Verifying whether the proper method selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking On Preview Button ***", async ()=>{});
    await io.homePage.loadingTime()
    var Response = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT, "/v2/products?page=0");
    await io.assert.expectToBeTrue(Response, "");
    test.step("***  Verified the default Page Number is set to 0   ***", async ()=>{});
  });
});
