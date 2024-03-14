import { test, expect } from "@celigo/ui-core-automation";
import fb from "@testData/flowbranching/fb_ui.json";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108694 Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run", () => {
  test("C108694 Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run", async ({
    io
  }, testInfo) => {
    let flowid;
    await test.step("*** Creating FlowBranching from API ***", async () => {
      flowid = await io.flowbranching.createFlowBranchFromAPI(fb);
    });
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowid
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.exportsPagePO.EXPORT_HOTSPOT_ICON,
      "Hotspot icons is not available on Export"
    );
  });
});
