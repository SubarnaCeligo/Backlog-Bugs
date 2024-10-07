
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103411_verify_octet_stream_is_availble_for_http_universal_connector", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
  });
  test("@Zephyr-IO-T24521 @Env-All TC_C103411", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    test.step("*** Click on Create Flow ***", async () => { });
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on import Bubble ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.APPLICATION,
      "HTTP"
    );
    await test.step(
      "*** Select transfer files into Destination option ***",
      async () => {}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.TRANSFER_FILES
    );
    await io.homePage.click(
      selectors.basePagePO.CREATE_FROM_SCRATCH
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "*** Click on Override request media type ***",
      async () => {}
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.REQUESTMEDIATYPE
    );
    const result = await (await io.homePage.findElementByDataValue("octet-stream")).isVisible();
    await test.step(
      "*** Verifying Octet Stream option is available ***",
      async () => {}
    );
    await io.assert.expectToBeTrue(result, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
