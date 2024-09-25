import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import fb from "@testData/flowbranching/fb_ui.json"


test.describe('C20856 Line graph filter applied by the user before logout should be applicable irrespective of the session', () => {

  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  });
  test.skip('@Zephyr-IO-T2976 @Env-All C20856 Line graph filter applied by the user before logout should be applicable irrespective of the session', async ({
    io,
    page
  }) => {
    let flowid
    await test.step("*** Creating FlowBranching from API ***", async () => {
      flowid = await io.flowbranching.createFlowBranchFromAPI(fb);
    });
    await io.homePage.navigateTo(process.env["IO_Integration_URL"] + "flowBuilder/" + flowid);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);
    await io.flowBuilder.clickByText('Last 30 days');
    await io.flowBuilder.clickByText('Last 4 hours');
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.waitForElementAttached(
      ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall"
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.ACCOUNT_SELECTOR,
      1
    );
    await io.flowBuilder.click(selectors.basePagePO.SIGN_OUT);
    await io.signInPage.signInToIO();
    await io.homePage.waitForElementAttached(selectors.homePagePO.LIST_VIEW);
    await io.homePage.navigateTo(process.env["IO_Integration_URL"] + "flowBuilder/" + flowid);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);
    await io.assert.verifyElementDisplayedByText('Last 4 hours', 'Unable to see 4 hours filter for line graph which is selected before logout');

  });
});
