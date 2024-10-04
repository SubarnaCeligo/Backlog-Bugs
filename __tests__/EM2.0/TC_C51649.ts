
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C51649.json";

test.describe("TC_C51649", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T19801 TC_C51649", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
await test.step(
      "Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flows.get(TC.name)["flowId"],
      [50, 0, 50]
    );
    var flowId = flows.get(TC.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("Error Table is opened", async ()=>{});
    await io.em2.getEm2ErrorTable(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await page.locator(selectors.myAccountPagePO.ERROR_CHECKBOX).nth(1).click();
    await page.locator(selectors.myAccountPagePO.ERROR_CHECKBOX).nth(2).click();

    await io.homePage.loadingTime();
    const addToBatch = await page.locator(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    ).nth(-1);

    const classs = await addToBatch.getAttribute("class");

    expect(classs.indexOf("Mui-checked")).toBeGreaterThan(-1);

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_SELECTED);
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(3);
  });
});
