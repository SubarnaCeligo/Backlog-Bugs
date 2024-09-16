
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51257.json";

test.describe("TC_C51257 verify preview and run functionality by removing all the source tabs", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22409 verify preview and run functionality by removing all the source tabs", async ({io,page}, testInfo) => {
    test.step("*** Creating Flow via API ***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);

    var flowID = flows.get("TC_C51257").flowId;
    await io.flowBuilder.navigateToTheFlow( flowID);

    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const map = new Map();
    const filepath = "/FTP_uploads/TC_C51221.json";
    map.set("uploadFile", filepath);
    await io.homePage.fileUpload(map);

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.FETCH_PREVIEW
    );

    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();


    test.step("*** Clicking on source fields ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      1
    );
    await page.keyboard.type("Control+A");
    await page.keyboard.type("Delete");

    test.step("*** Click on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Click On Save and close ***", async ()=>{});

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flows.get(TC.name)["flowId"],
      [0, 0, 0]
    );

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
