import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/FlowBuilder/TC_C31310.json";
  

test.describe("@Env-All @Zephyr-IO-T2914 To verify file.csv.trimSpaces should not be logged in audit logs when when there is no update to the boolean field", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T2914", async ({io}) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);

    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC.name)["flowId"]
    );

    await io.homePage.loadingTime();
    test.step("*** Clicking on Export name ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.EXPORT);

    test.step("*** Modifying the Export name ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "FTP"
    );

    test.step("*** Saving and closing export ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Opening Audit logs ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.AUDIT_LOGS
    );
    await io.homePage.loadingTime();

    let columnIndex = (await io.homePage.getElementOrIndex(
      "thead th",
      "Field",
      true
    )) as number;
    columnIndex++;
    const rowIndex = (await io.homePage.getElementOrIndex(
      "tbody td:nth-child(" +
        columnIndex +
        ")",
      "file.csv.trimSpaces",
      true
    )) as number;

await test.step(
      "*** Verified file.csv.trimSpaces is not logged ***"
, async ()=>{});
    await io.assert.expectToBeValue(String(rowIndex), "-1", "");
  });
});
