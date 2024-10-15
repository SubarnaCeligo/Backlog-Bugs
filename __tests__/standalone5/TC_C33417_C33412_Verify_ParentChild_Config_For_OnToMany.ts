import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C33417_C33412_Verify_ParentChild_Config_For_OnToMany.json";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";
import { allure } from "allure-playwright";
import { Validations } from "@celigo/aut-validations";


test.describe("TC_C33417_C33412_Verify_ParentChild_Config_For_OnToMany", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T5527 @Env-All|@Zephyr-IO-T5562 @Env-All TC_C33417_C33412_Verify_ParentChild_Config_For_OnToMany", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Select transfer files dropdown ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Validating the data structure with one to many as false***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var withManyTransfer: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    withManyTransfer = withManyTransfer.replace(/[\r\n ]+/g, "");
    let Validation1 = new Validations();
    var response1 = await Validation1.validateJSONData(FTP.withOneToMany, JSON.parse(withManyTransfer));

    await io.assert.expectToContainValue("passed",response1["overallStatus"], "");

    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    test.step("*** Discarding the data ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on the directory path handle bar***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Validating the data structure with one to many as false***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var withManyLookup: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    withManyLookup = withManyLookup.replace(/[\r\n ]+/g, "");
    let Validation2 = new Validations();
    var response2 = await Validation2.validateJSONData(FTP.withOneToManyLookup, JSON.parse(withManyLookup)
    );
    await io.assert.expectToContainValue("passed",response2["overallStatus"], "");

    test.step("*** Closing the handle bar ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    test.step("*** Discarding the data ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

  });
});
