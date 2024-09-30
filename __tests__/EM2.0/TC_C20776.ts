
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20776 from "@testData/EM2.0/TC_C20776.json";

test.describe("TC_C20776", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io, page}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T3987 @Zephyr-IO-T3081 TC_C20776| Verifiy “Lookup fails” is shown for PP_Export and “Import fails” for PP_import on Proceed of failures selection pop up", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20776);
    flowId = flows.get(TC_C20776.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.isPageReady();
    let addDataProc = await page.$$(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await addDataProc[1].isVisible();
    await addDataProc[1].click();
    let proceedOnFailure = await page.$$(
      "[data-test='proceedOnFailure']"
    );
    await proceedOnFailure[0].click();
    const exist = await io.homePage.isVisible(
      "//div[text()='What should happen to a record if the lookup fails?']"
    );
    await io.assert.expectToBeTrue(exist, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await addDataProc[2].isVisible();
    await addDataProc[2].click();
    await proceedOnFailure[1].click();
    const existt = await io.homePage.isVisible(
      "//div[text()='What should happen to a record if the import fails?']"
    );
    await io.assert.expectToBeTrue(existt, "");
  });
});
