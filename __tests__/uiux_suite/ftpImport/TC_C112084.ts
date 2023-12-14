import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112084 User should able to run the flow successfully", () => {
  test("C112084 User should able to run the flow successfully", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='JWTGITHUB_DND'")
    await io.homePage.clickByText("JWTGITHUB_DND")
    await io.flowBuilder.loadingTime();
    await io.homePage.click("[data-test='runFlow']");
    const lastRun = page.getByText('Last run');
    try {
      await lastRun.waitFor({ state: "visible", timeout: 20000 });
    } catch (error) {
      console.log("error", error);
    }
    await expect(lastRun).toBeVisible();
    await io.flowBuilder.addStep("Verified the flow ran successfully");
  });
});