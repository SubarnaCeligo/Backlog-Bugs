import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C108673 C108684 Verify whether Hotspot icons when result mapping is errored out", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  });
  test("C108673 C108684 @Zephyr-IO-T23932 @Zephyr-IO-T23943 @Env-All ", async ({ io, page }) => {
    await io.homePage.addStep("*** Navigated to integrations page ***");
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "C108673_DND"
    );
    await io.integrationPage.clickByText("C108673_DND");
    await io.integrationPage.loadingTime();
    await io.integrationPage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
    // await page.waitForFunction(
    //   () => {
    //     const element: HTMLDivElement = document.querySelector(
    //       "[aria-label='relative date time']"
    //     );
    //     return Boolean(element);
    //   },
    //   { timeout: 1200000 }
    // );

    await io.integrationPage.loadingTime();

    const exportBubble = await page.$(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    const exportBubbleText = await exportBubble.evaluate(el => el.textContent);
    expect(exportBubbleText).toEqual('TExport');


    // C108684
    const importBubbles = await page.$$(selectors.flowBuilderPagePO.IMPORT);
    const secondImportBubble = importBubbles[1];
    const invisibleTIcon = await secondImportBubble.evaluate(el => el.querySelector('.MuiBadge-invisible'));
    expect(invisibleTIcon).not.toBeNull();

    await io.integrationPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.integrationPage.loadingTime();
    await io.loginPage.fill(
      selectors.basePagePO.FORM_DESCRIPTION,
      String(Math.random())
    );

    // C108673
    const warningMessage = page.locator('text=Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.')
    await expect(warningMessage).toBeVisible();

    await io.integrationPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.integrationPage.loadingTime();
    const resultsList = await page.$$(selectors.myAccountPagePO.RELATIVE_DATE_TIME);
    expect(resultsList.length).toEqual(0);
    await io.homePage.addStep("*** Done ***");
  });
});