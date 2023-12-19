import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112084 User should able to run the flow successfully", () => {
  test("C112084 User should able to run the flow successfully", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='JWTGITHUB_DND'")
    await io.homePage.clickByText("JWTGITHUB_DND")
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.assert.verifyElementDisplayedByText(
      "Last run",
      "Last run is not displayed"
    );
  
    await io.flowBuilder.addStep("Verified the flow ran successfully");
  });
});