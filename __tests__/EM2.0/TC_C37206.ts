
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C37206 from "@testData/EM2.0/TC_C37206.json";

test.describe("TC_C37206", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7534 Verify if Success is clickable on Integration level", async ({io,page}, testInfo) => {
    // Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C37206);
await test.step(
      "Created Flow " +
        flows.get(TC_C37206.name)["flowName"] +
        " With ID " +
        flows.get(TC_C37206.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C37206.name,
      flows.get(TC_C37206.name)["flowId"],
      [1, 0, 0]
    );

    // Open Steps Error Table
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C37206.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("Click on success link", async ()=>{});
    await io.homePage.click(
      "tr.MuiTableRow-root > td:nth-child(5)"
    );
    test.step("Verifying if Error table shows 0 errors", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const text = await page.getByText("0 errors in this run").isVisible();
    await io.assert.expectToBeTrue(text, "Error table shows 0 errors");
    await io.emailPage.closeWindow();
  });
});
