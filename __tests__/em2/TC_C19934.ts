
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C19934", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7289 TC_C19934|checking whether user is able to view Line graph option once upgraded to 2.0", async ({io, page}) => {
    test.step("*** Clicked An Integration  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ANALYTICS_TAB);
    test.step("*** Navigated to Analytics tab ***", async ()=>{});
    
    test.step("user is able to view Line graphs", async ()=>{});
    const list = [
      "Flow: Success",
      "Average processing time/success record",
      "Flow: Errors",
      "Flow: Ignored",
      "Flow: Resolved",
    ];

    let graphspresent = await io.flowBuilderDashboard.verifyAllGraphsArePresent();
    await io.assert.expectToBeTrue(graphspresent, "");
  });
});
