import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";



test.describe("@Env-All @Zephyr-IO-T3075 Verify the steps in all the past runs under run history", () => {
  test("@Env-All @Zephyr-IO-T3075", async ({io,page}) => {
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
await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE,0);
await io.homePage.loadingTime();
await page.getByText("Error Details");
await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
await io.homePage.loadingTime();
await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.JOB_ERRORS_RUN_CONSOLE,1);
await io.homePage.loadingTime();
await page.getByText("Error Details");
  });
});
