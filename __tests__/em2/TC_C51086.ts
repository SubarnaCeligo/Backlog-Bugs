
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51086 from "@testData/EM2.0/TC_C51086.json";

test.describe("TC_C51086", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23302 TC_C51086", async ({io,page}, testInfo) => {
    test.step("*** Create a flow***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51086);
await test.step(
      "Created Flow " +
        flows.get(TC_C51086.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51086.name)["flowId"],async () => {
          
        }
    );
    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C51086.name,
      flows.get(TC_C51086.name)["flowId"],
      [2, 0, 1]
    );
    var flowId = flows.get(TC_C51086.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    test.step("Error Table is opened", async ()=>{});

    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.em2.getEm2ErrorTable(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the retry error***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT
    );
    // await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    test.step("*** Close the error tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();

    var formedURL = "v1/jobs?_flowId=" + flowId;

    test.step("*** Grtting the response ***", async ()=>{});
    var result = await io.api.getCall(
      formedURL);
    await expect(result[0]).hasOwnProperty("triggeredBy");

    test.step("*** Go to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
