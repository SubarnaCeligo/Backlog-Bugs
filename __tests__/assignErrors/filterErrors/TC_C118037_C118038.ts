import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118037_C118038 Verify that 'Clear filter' button is disabled when 'All errors' is selected ", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T20055 C118037 Verify that 'Clear filter' button is disabled when 'All errors' is selected", async ({
    io,
    page,
  }) => {
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 4);
    await page
      .locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
      .waitFor({
        state: "visible",
        timeout: 180000
      });
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.loadingTime();
    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    // await io.flowBuilder.clickButtonByIndex('#arrow-popper .PrivateSwitchBase-input', 0);

    await io.flowBuilder.checkAndUncheck(
      selectors.filterErrorTag.ALLERRORSSELECTOR,
      "All errors",
      0
    );

    await io.assert.verifyElementAttributeContainsText(
      selectors.filterErrorTag.CLEARTAGSSELECTOR,
      "class",
      "Mui-disable"
    );

  });
  test("C118038 Verify that 'Clear filter' button is enabled when specific filter is applied", async ({
    io,
    page,
  }) => {
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 4);
    await page
      .locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
      .waitFor({
        state: "visible",
        timeout: 180000
      });
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.loadingTime();
    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Apply a filter
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText("Myself");
    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the button
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    const isEnabled = await page.$eval(selectors.filterErrorTag.CLEARTAGSSELECTOR, (element) => element.hasAttribute("Mui-disable"));
    await io.assert.expectToBeFalse(isEnabled, 'Element is not disabled');


  });
});
