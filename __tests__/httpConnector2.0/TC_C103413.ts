
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103413_Verify_Octet_Stream_is_not_availble_for_HTTP2.0", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24523 @Env-All TC_C103413", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    test.step("*** Click on Create Flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on import Bubble ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.APPLICATION,
      "JazzHR"
    );
    await test.step(
      "*** Select transfer files into Destination option ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.connectionsPagePO.IMPORT_RECORDS
    );
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.click(
      selectors.basePagePO.HTTP_2DOT0
    );
    await test.step(
      "*** Click on Override request media type ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.REQUESTMEDIATYPE
    );
    await io.homePage.loadingTime();
    const data = await io.homePage.getDropDownValue(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Octet stream");
    await test.step(
      "*** Verifying Octet Stream option is not available in HTTP2.0 ***",
      async ()=>{}
    );
    await io.assert.expectToBeFalse((data), "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
