
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C37207 from "@testData/EM2.0/TC_C37207.json";

test.describe("TC_C37207 | TC_C37209", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7535 TC_C37207 | Verify if Success is clickable on Run console ", async ({io,page}, testInfo) => {
    // Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C37207);
await test.step(
      "Created Flow " +
        flows.get(TC_C37207.name)["flowName"] +
        " With ID " +
        flows.get(TC_C37207.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C37207.name,
      flows.get(TC_C37207.name)["flowId"],
      [1, 0, 0]
    );

    // Navigate to Flow Builder
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C37207.name)["flowId"]
    );

    test.step("Finding the Success element", async ()=>{});
    const colIndex = (await io.homePage.getElementOrIndex(
      "thead th",
      "Errors",
      true
    )) as number;
    const rowIndex = 1;
    const successLocator = `tbody tr:nth-child(${rowIndex}) td:nth-child(${
      colIndex + 1
    }) button`;
    const success = await page.locator(successLocator);
    test.step("Verifying if Success is clickable", async ()=>{});
    const isSuccessClickable = await success.isEnabled();
    await io.assert.expectToBeTrue(isSuccessClickable, "");
  });

  test("@Env-All @Zephyr-IO-T7536 TC_C37209 | Verify if Success is clickable on Run history ", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C37207);
await test.step(
      "Created Flow " +
        flows.get(TC_C37207.name)["flowName"] +
        " With ID " +
        flows.get(TC_C37207.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C37207.name,
      flows.get(TC_C37207.name)["flowId"],
      [1, 0, 0]
    );

    // Navigate to Flow Builder
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C37207.name)["flowId"]
    );

    test.step("Clicking on the Run History tab", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();
    test.step("Opening the Job detail", async ()=>{});
    await io.homePage.click(
      "button[data-test='toggleJobDetail']"
    );

    test.step("Finding the Success element", async ()=>{});
    const colIndex = (await io.homePage.getElementOrIndex(
      "thead th",
      "Errors",
      true
    )) as number;
    const rowIndex = 2;
    const successLocator = `tbody tr:nth-child(${rowIndex}) td:nth-child(${
      colIndex + 1
    }) button`;
    const success = await page.locator(successLocator);
    test.step("Verifying if Success is clickable", async ()=>{});
    const isSuccessClickable = await success.isEnabled();
    await io.assert.expectToBeTrue(isSuccessClickable, "");
  });
});
