import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51234.json";

test.describe("TC_C51234 verify when user has 1 sources if it is removed and 2 new source added", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });
  test("@Env-All @Zephyr-IO-T22397  verify when user has 1 sources if it is removed and 2 new source added", async ({
    io,
    page
  }) => {
    
    test.step("*** Creating PageGenerator ***", async () => {});
    flowID = await io.createResourceFromAPI(TC, "FLOWS");
    const flowDoc = await io.api.getCall("v1/flows/" + [flowID]);
    const _importId = flowDoc?.pageProcessors?.[0]?._importId;

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const map = new Map();
    const filepath = "/FTP_uploads/TC_C51221.json";
    map.set("uploadFile", filepath);
    await io.homePage.fileUpload(map);

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on source fields ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      1
    );
    await page.keyboard.type("Control+A");
    await page.keyboard.type("$.mother,$.siblings[*].children[*]");

    test.step("*** Click on Preview ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Click On Save and close ***", async () => {});

    test.step("*** Navigating to Home Page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    test.step("*** Fetching import doc ***", async () => {});
    let importJson1 = await io.api.getCall(`v1/imports/${_importId}`);

    await test.step("*** Validating new sources are added test.afterEach deleting one source ***", async () => {});
    await expect(importJson1.mappings[1].buildArrayHelper[0]).hasOwnProperty(
      "extract"
    );
    await expect(importJson1.mappings[1].buildArrayHelper[0]).hasOwnProperty(
      "$.mother"
    );
  });
});
