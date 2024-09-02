import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C51115_Verify_Added_Expression_Persist_Save_ReOpen.json";
import { allure } from "allure-playwright";

test.describe("TC_C51115_Verify_Added_Expression_Persist_Save_ReOpen", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Epic-IO-92523 @Env-All @Zephyr-IO-T22346 TC_C51115_Verify_Added_Expression_Persist_Save_ReOpen", async ({io,page}, testInfo) => {
    test.step("*** Creating Flow ***", async ()=>{});
    let flowId = await io.createResourceFromAPI(TC, 'FLOWS');

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Fetching imporId ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowId);
    const importId = flowJson.pageProcessors[0]._importId;

    test.step("*** Clicking on mapping ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Closing the mapping ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const importJson = await io.api.getImportById(importId);

    test.step("*** Validating Added Expression Persist ***", async ()=>{});
    await expect(importJson).hasOwnProperty("mappings");

    await io.assert.expectToContainValue("123", importJson.mappings[0].extract, "");
    await io.assert.expectToContainValue("abc", importJson.mappings[1].extract, "");

    test.step("*** Navigate to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
