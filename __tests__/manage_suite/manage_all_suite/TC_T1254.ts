import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/T1254.json";
import testData from "./manage_all.json";

test.describe("Verify the attach detach scenarios for aliases dependent flows with manage access", () => {
  let id1, id2;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id1);
    await io.api.deleteFlowViaAPI(id2);
  });

  test("@Zephyr-IO-T1254 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the attach detach scenarios for aliases dependent flows with manage access", async ({
    io,
    page
  }) => {
    await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    const newFlow = JSON.parse(JSON.stringify(flow));
    id2 = await io.createResourceFromAPI({...flow, name: 'T1254 flow-2'}, "FLOWS");
    id1 = await io.createResourceFromAPI({...newFlow, name: 'T1254 flow-1'}, "FLOWS");
    const res = await io.api.patchCall(
      `v1/flows/${id1}`,
      [{
        "op": "replace",
        "path": "/aliases",
        "value": [{"alias": "test-1", "_flowId": `${id2}`}]
      }]
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'T1254 flow-1');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DETACHFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CONFIRMDETACH);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SNACKBAR_CLOSE_BUTTON);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.SNACKBAR_CLOSE_BUTTON,
      "Error snack bar is not displayed"
    );
  });
});
