import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C23016.json";

test.describe("TC_C23016_C19866", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2798|@Env-All @Zephyr-IO-T2779|Verify the date and Time zone value showing on the Delta flow popup for Automatic should be as per time zone present in IO account.|To verify automatic and custom date-time format is similar.", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);

    // TC_C19866 | Verify automatic and custom date-time format is similar.
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.click(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST);
    let autoLabels = await io.homePage.getText(
      "[id='startDateAutomatic']"
    );

    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_DELTA_FIELD);
    let customLabels = await io.homePage.getText(
      "[id='startDateCustom']"
    );
    expect(autoLabels).toEqual(customLabels);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //TC_C23016 | Verify the date and Time zone value showing on the Delta flow popup for Automatic should be as per time zone present in IO account.
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );

    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.myAccountPagePO.TIMEZONE,
      "Australia/Sydney"
    );
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await page.pause();
    await io.homePage.click(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST);
    var time = await page.locator(selectors.flowBuilderPagePO.TIME_CUSTOMSETTINGS + ">div>div>input");
    var timeAutomaticDelta = await time.getAttribute('value');
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );

    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.myAccountPagePO.TIMEZONE
    );
    await io.homePage.click('[data-value="Australia/Darwin"]');
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.click(selectors.flowBuilderPagePO.AUTOMATIC_DATA_TEST);
    var timeDiv = await page.locator(selectors.flowBuilderPagePO.TIME_CUSTOMSETTINGS + ">div>div>input");
    var time1 = await timeDiv.getAttribute('value');
    expect(time1).not.toBe(timeAutomaticDelta);
  });
});
