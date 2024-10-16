
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C1626 from "@testData/EM2.0/TC_C1626.json";
test.describe("TC_C1626", () => {
  let flows;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T11391 TC_C1626|Extra square brackets are added in import mapping when json file is uploaded", async ({io, page}) => {
    //Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C1626);
await test.step(
      "***Created Flow " +
        flows.get(TC_C1626.name)["flowName"] +
        " With ID " +
        flows.get(TC_C1626.name)["flowId"] +
        " ***",async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C1626.name,
      flows.get(TC_C1626.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C1626.name)["flowId"]
    );
    test.step("Navigating to flowbuilder page", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    test.step("clicked on import mapping", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var p2 = (await io.homePage.getText(selectors.importPagePO.PREVIEWMAP)).toString();
    if (p2.charAt(0) !== "[" && p2.charAt(p2.length - 1) !== "]") {
      var res = true;
    }
    await io.assert.expectToBeTrue(res, "");
await test.step(
      "The extra square brackets are not added when json-json flow is build."
, async ()=>{});
  });
});
