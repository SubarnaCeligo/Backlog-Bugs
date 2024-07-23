import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/T1254.json";

test.describe("Mapper 2.0 and filter cases", () => {
  let id1, id2;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id1);
    await io.api.deleteFlowViaAPI(id2);
  });

  test("@Zephyr-IO-T22564 @Zephyr-IO-T2641 @Env-All @Epic-IO-86262 @Priority-P2 - Verify whether matches are highlighted after user searches any destination field in Mapper && Verify save button is disabled initially and also after adding filters in edit case", async ({
    io,
    page
  }) => {
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
    await io.flowBuilder.waitForElementAttached('[data-test="snackbarclose-button"]');
    await io.assert.verifyElementIsDisplayed(
      '[data-test="snackbarclose-button"]',
      "Error snack bar is not displayed"
    );
  });
});
