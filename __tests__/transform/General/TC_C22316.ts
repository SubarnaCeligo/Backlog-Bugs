
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C22316 from "@testData/GENERAL/TC_C22316.json";

test.describe("TC_C22316", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22316", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C22316);
    var flow = await io.api.getFlowId(TC_C22316.name);
await test.step(
      "Created Flow " +
        flows.get(TC_C22316.name)["flowName"] +
        " With ID " +
        flows.get(TC_C22316.name)["flowId"]
    ,()=>{});
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC_C22316.name,
      flows.get(TC_C22316.name)["flowId"],
      [0, 0, 1]
    );
    await io.em2.getEm2ErrorTable( flow);

    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      2
    );
    if (
      process.env["NODE_ENV"] == "staging" ||
      process.env["NODE_ENV"] == "iaqa"
    ) {
      await io.homePage.click(
        "[data-test='viewErrorDetails']"
      );
      await io.homePage.click(
        selectors.integrationPagePO.ERRORDETAILSPAGE
      );
    }
    var err = await io.homePage.readtextfromerror(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
    expect(err).toBe(false);

    await test.step("verified that the tracekey isn't showing",()=>{});
  });
});
