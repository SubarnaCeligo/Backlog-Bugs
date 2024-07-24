import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/T1254.json";
import testData from "@testData/monitorSuite/monitor_all.json";

test.describe("Verify the attach detach scenarios for aliases dependent flows with manage access", () => {

  test("@Zephyr-IO-T1254 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the attach detach scenarios for aliases dependent flows with manage access", async ({
    io,
    page
  }) => {
    await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );

    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 1);
    await io.assert.verifyElementNotBeFound(selectors.flowBuilderPagePO.DETACHFLOW);
  });
});
