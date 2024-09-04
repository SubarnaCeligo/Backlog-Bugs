import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3061|@Zephyr-IO-T3063|@Zephyr-IO-T3070|@Zephyr-IO-T3071", () => {

  test("@Env-All @Zephyr-IO-T3061|@Zephyr-IO-T3063|@Zephyr-IO-T3070|@Zephyr-IO-T3071 Verify header for Run console, Verify expandables steps under Run History in integration level dashboard, Verify flow steps error are clickable, Verify error dashboard for open errors after clicking the flow step error", async ({io,page}) => {
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
    await expect(page.getByText('Auto-resolved')).toBeVisible;
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      1
    );
    await io.homePage.loadingTime();
    const value = await io.flowBuilder.getText(selectors.exportsPagePO.HELP_TEXT_POPOVER_TITLE_EXPORT);
    const expectedvalue =
      "Auto-resolved";
    const func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "");
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
    
  });
});
