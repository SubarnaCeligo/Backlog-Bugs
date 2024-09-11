import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3073", () => {
  test("@Env-All @Zephyr-IO-T3073 Verify the error summary", async ({io,page}) => {
await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
await io.homePage.loadingTime();
await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
await io.homePage.fillWebPage(
  selectors.flowBuilderPagePO.SEARCHBUTTON,
  "TC_C34143_Flow_DND"
);
await io.homePage.loadingTime();
await io.homePage.clickByText("Automation Flows");
await io.homePage.loadingTime();
await io.homePage.click(selectors.flowBuilderPagePO.SEARCH);
await io.homePage.fill(
  selectors.flowBuilderPagePO.SEARCH,
  "TC_C34143_Flow_DND"
);
await io.homePage.loadingTime();
await io.homePage.clickByTextByIndex("TC_C34143_Flow_DND", 0);
await io.homePage.loadingTime();
await io.homePage.click(
  selectors.flowBuilderPagePO.RUN_HISTORY
);
await io.homePage.loadingTime();
await io.homePage.clickButtonByIndex(
  selectors.flowBuilderPagePO.TOGGLE_JOB,
  0
);
await io.homePage.loadingTime();
await io.flowBuilder.click(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE);
await io.homePage.loadingTime();
await page.getByText("Error Details");
await page.getByText("1 error in this run : 1 open | 0 resolved");
await io.homePage.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
await io.homePage.loadingTime();
await page.getByText("1 error in this run : 1 open | 0 resolved");
await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
await io.homePage.loadingTime();
await page.getByText("1 error in this run : 1 open | 0 resolved");
  });
});
