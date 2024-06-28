import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import fb from "@testData/flowbranching/TC_C110781_C110787_C110788_C111507.json";

test.describe.configure({ retries: 1 });

test.describe("TC_C110781_C110787_C110788_C111507", () => {
  let flowid;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowid);
  });
  test("@Env-All TC_C110781_C110787_C110788_C111507", async ({
    io,
    page
  }, testInfo) => {
    flowid = await io.flowbranching.createFlowBranchFromAPI(fb);
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowid
    );
    await io.flowBuilder.loadingTime();
    let unmerge = selectors.flowBranchingPO.UNMERGE_BRANCHING;
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(unmerge);
    await io.assert.checkSnapshot(unmerge, "C110781-PLAYWRIGHT-darwin-PLAYWRIGHT-darwin.png");
    await io.myAccountPage.clickByIndex(unmerge, 0);
    await io.assert.verifyElementDisplayedByText(
      "Unmerge branch",
      "Unable to open unmerge menu"
    );
    await io.homePage.clickByText("Unmerge branch");
  });
});
