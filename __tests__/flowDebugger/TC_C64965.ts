import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C64965.json";

test.describe("TC_C64965_C98383", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24876 TC_C64965_C98383", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {
      let retries = 10;
      while (retries > 0) {
        try {
          const element = await page.locator(selectors.flowBuilderPagePO.FLOW_DISABLE);
          if (element) {
            await element.click();
            break;
          }
        } catch (error) {
          console.log("Element not ready, retrying...");
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retry
          retries--;
        }
      }

      if (retries === 0) {
        throw new Error("Failed to click the disable flow button after multiple attempts");
      }
    });
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => { });
    await io.homePage.loadingTime();
    // TC_C64965 - Verify If there are more records than responses, then the responses should be round robined
    let numberRecords =
      TC.qa__api_tdata[0].pageGenerators[0].qa__export.mockOutput.page_of_records
        .length;
    let numberResponses =
      TC.qa__api_tdata[0].pageProcessors[0].qa__import.mockResponse.length;
    await expect(numberRecords).toBeGreaterThan(numberResponses);
    test.step("***  Verifying that there are more records than responses  ***", async () => { });
    let response1Name = "Mary Poppins";
    let response2Name = "Sherlock Holmes";
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();
    let tableRows = await page.$$(selectors.flowBuilderPagePO.AFE_TABLE_ROWS);
    for (let i = 0; i < tableRows.length; i++) {
      await io.homePage.click(tableRows.toLocaleString()[i]);
      await io.homePage.loadingTime();
      let resultData = await io.homePage.copyResourceData(
        selectors.mappings.MAPPER2DOT0PO.RESULT
      );
      let data = JSON.parse(String(resultData));
      if (i % 2 === 0) {
        await expect(data.record.Result_Name).toEqual(response1Name);
      } else {
        await expect(data.record.Result_Name).toEqual(response2Name);
      }
    }
    test.step("***  Verifying that if there are more records than responses, then the responses should be round robined***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("***  Closing the drawer  ***", async () => { });
    // TC_C98383 - Verify If user toggle between AFE1.0/2.0/handlebar then the record is loading properly.
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** Opening the FTP import ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.FTPDIRECTORYPATH,
      1
    );
    test.step("*** Opening the FTP File Name Handlebar ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    test.step("*** Toggling to AFE 1.0 ***", async () => { });
    // await io.homePage.click(selectors.flowBuilderPagePO.HANDLEBARS_TEMPLATE);
    test.step("*** Switching to HandleBar Tab ***", async () => { });
    let inputData = await io.homePage.copyResourceData(
      selectors.exportsPagePO.FORM_DEFINITION
    );
    await expect(String(inputData)).toContain("data");
    await io.homePage.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    test.step("*** Toggling to AFE 2.0 ***", async () => { });
    await io.homePage.loadingTime();
    inputData = await io.homePage.copyResourceData(
      selectors.exportsPagePO.FORM_DEFINITION
    );
    await expect(String(inputData)).toContain("record");
    test.step("*** Verifying that  If user toggle between AFE1.0/2.0/handlebar then the record is loading properly. ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page   ***", async () => { });
  });
});
