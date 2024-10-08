
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C20857", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7400 |Verify 'Integration-level' line graph is present for tile level dashboard", async ({io, page}) => {
    test.step("*** Naviging to Analytics tab ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.ANALYTICS_TAB
    );
    await io.homePage.reloadPage();
    await io.homePage.isPageReady();
    await io.homePage.click(
      "div > div> div:nth-child(2) > div> div > button:nth-child(3)"
    );

    const requiredOption = "Integration-level";
await test.step(
      `*** Verifying if '${requiredOption}' option is available on Resource Dropdown ***`
, async ()=>{});
    const isOptionAvailable = (await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.FLOWDROPDOWNOPTIONS)).includes(
      requiredOption
    );
    await io.assert.expectToBeTrue(isOptionAvailable, "");
  });
});
