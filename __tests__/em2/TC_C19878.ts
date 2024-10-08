
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C19878 from "@testData/EM2.0/TC_C19878.json";
import { allure } from "allure-playwright";

test.describe("TC_C19878", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7282 TC_C19878| Verify When user retry resolved errors, user receive a warning type confirmation dialog", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C19878);
await test.step(
      "Created Flow " +
        flows.get(TC_C19878.name)["flowName"] +
        " With ID " +
        flows.get(TC_C19878.name)["flowId"],async()=>{}
    );
    await io.api.checkJobStatusFromAPI(
      TC_C19878.name,
      flows.get(TC_C19878.name)["flowId"],
      [5, 0, 5]
    );
    test.step("*** Searched for error ***", async ()=>{});
    await io.em2.getEm2ErrorTable(
      flows.get(TC_C19878.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      "table > tbody >tr >th",
      3
    );
    await io.homePage.clickByIndex(
      "table > tbody >tr >th",
      4
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.RESOLVE_JOBS
    );
    test.step("Resolving the selected errors", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_SELECTED
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEDERRORS
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    test.step("***Clicked On Retry Dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL
    );
    var retryDialog = await page.locator( ".MuiDialog-root").isVisible();
    await io.assert.expectToBeTrue(retryDialog, "");
  });
});
