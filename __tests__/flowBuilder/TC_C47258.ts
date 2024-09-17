import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C47258", () => {
  test("@Env-All @Zephyr-IO-T3091", async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    await test.step(
      "*** clicked on Completed Flows in Dashboard ***"
      , async () => { });
    await io.homePage.click(
      selectors.dashboardPagePO.DATERANGE_LABEL
    );
    await test.step(
      `*** Selected Opened Date-Time Range List ***`
      , async () => { });
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.DATERANGEOPTION,
      "Custom"
    );
    await io.homePage.click(
      selectors.dashboardPagePO.CUSTOMDATE_START_OF_THE_WEEK
    );
    await io.homePage.click(
      selectors.dashboardPagePO.CUSTOMDATE_TODAY
    );
    await io.homePage.click(
      selectors.integrationPagePO.APPLYBUTTONDATERANGESELECTOR
    );
    await io.homePage.loadingTime();
    var res = await io.homePage.getText(
      selectors.dashboardPagePO.DATERANGE_LABEL
    );
    expect(res).toMatch(
      new RegExp(
        "^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}-[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$",
        "i"
      )
    );
    await test.step(
      "*** After Custom date rage selected the date is showig in format of MM/DD/YYYY-MM/DD/YYYY.***"
      , async () => { });
  });
});
