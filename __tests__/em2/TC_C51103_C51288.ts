
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51103 from "@testData/EM2.0/TC_C51103.json";

test.describe("TC_C51103_C51288", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23312 @Zephyr-IO-T23330 TC_C51103_C51288", async ({io,page}, testInfo) => {
    test.step("*** Create a flow***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51103);
await test.step(
      "Created Flow " +
        flows.get(TC_C51103.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51103.name)["flowId"],async () => {
          
        }
    );
    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C51103.name,
      flows.get(TC_C51103.name)["flowId"],
      [2, 0, 1]
    );
    var flowId = flows.get(TC_C51103.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    test.step("Error Table is opened", async ()=>{});

    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.em2.getEm2ErrorTable(  flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);

    test.step("*** Click on the retry error***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Close the error tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

await test.step(
      "*** Validate retry completed text on top of the flow builder page***"
, async ()=>{});
    await io.homePage.loadingTime();
    const data = await page.getByText("Retry completed").nth(0).isVisible();
    await io.assert.expectToBeTrue(data, "");

    test.step("*** Open the error window***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    test.step("*** Click on the retries tab***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicking on Select button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.INSTALLBUTTONTEMPLATE,
      0
    );
    test.step("*** Filter with the single user***", async ()=>{});
    if (
      process.env["ENVIRONMENT"] == "staging" ||
      process.env["ENVIRONMENT"] == "iaqa"
    ) {
      await page.getByText("IO em new").nth(0).click();
    } else {
      await page.getByText("IO Automation EM2.0").nth(1).click();
    }

    test.step("*** Click on the apply button***", async ()=>{});
    await io.homePage.clickByText("Apply");
await test.step(
      "*** Validating the retry filter with single user***"
, async ()=>{});
    const data2 = (await io.homePage.getText(".MuiBox-root > div > div >table >tbody >tr >td >div >div")).toString();
    if (
      process.env["ENVIRONMENT"] == "staging" ||
      process.env["ENVIRONMENT"] == "iaqa"
    ) {
      await io.assert.expectToContainValue("IO em new",data2, "");
    } else {
      await io.assert.expectToContainValue("IO Automation EM2.0",data2, "");
    }

    test.step("*** Close the error tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    test.step("*** Go to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
