
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51269 from "@testData/EM2.0/TC_C51269.json";

test.describe("@Env-All @Zephyr-IO-T23320 TC_C51269", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23320 TC_C51269", async ({io,page}, testInfo) => {
    test.step("*** Create a flow***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51269);
await test.step(
      "Created Flow " +
        flows.get(TC_C51269.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51269.name)["flowId"],async () => {
          
        }
    );
    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C51269.name,
      flows.get(TC_C51269.name)["flowId"],
      [2, 0, 1]
    );
    var flowId = flows.get(TC_C51269.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    test.step("Error Table is opened", async ()=>{});

    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.em2.getEm2ErrorTable(flowId);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the retry error***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT
    );
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clcik on view results ***", async ()=>{});
    await page.getByText('View results').click();

await test.step(
      "*** Validate the retry page should be navigated ***"
, async ()=>{});
    var data = (await io.homePage.getText(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_TABLE)).toString();
    await io.assert.expectToContainValue("Retry started by",data, "");

    test.step("*** Close the error tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    test.step("*** Go to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
