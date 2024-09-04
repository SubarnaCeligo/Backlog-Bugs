
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51622 from "@testData/EM2.0/TC_C51622_C51616.json";

test.describe("TC_C51622_C51616", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19774 @Zephyr-IO-T19768 TC_C51622_C51616", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51622);
await test.step(
      "Created Flow " +
        flows.get(TC_C51622.name)["flowName"] +
        " With ID " +
        flows.get(TC_C51622.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      TC_C51622.name,
      flows.get(TC_C51622.name)["flowId"],
      [50, 0, 50]
    );
    var flowId = flows.get(TC_C51622.name)["flowId"];
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS
    );

    await io.homePage.clickButtonByIndex(
      "[aria-labelledby='toggle-view-label'] li",
      1
    );
    test.step("navigated to old view", async ()=>{});
    await io.homePage.loadingTime();
    const flag: boolean = await page.locator(selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS).isVisible();
    await io.assert.expectToBeTrue(flag,"");
await test.step(
      "Verified the toggle option is still visible "
, async ()=>{});

    // TC_C51616 done
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS
    );
    await io.homePage.clickButtonByIndex(
      "[aria-labelledby='toggle-view-label'] li",
      0
    );
    await io.homePage.loadingTime();
    test.step("navigated to new view", async ()=>{});

    const text = (await io.flowbranching.flowBranchingPage.getList("p")).join(" ");
    expect(text).toEqual(expect.stringContaining('Click an error row to view its details'));
    expect(text).toEqual(expect.stringContaining('or select the checkboxes for batch actions.'));
    // TC_C51622 done
await test.step(
      "Verified the 'Click an error row to view its details or select the checkboxes for batch actions.' text visible "
, async ()=>{});

    test.step("Code column of first row is selected", async ()=>{});
  });
});
