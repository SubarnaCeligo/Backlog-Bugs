import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30793_T30774_T30810", () => {
  test("@Env-PLATFORMTHREE @Env-QA  @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30793 @Zephyr-IO-T30774 @Zephyr-IO-T30810 TC_T30793_T30774_T30810", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.sync.clickOnCreateSync();

    //T30793 existing integration help text
    // await io.flowBuilder.click(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    // );
    // await io.assert.verifyElementContainsText(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
    //   "text to be added"
    // );
    // await io.flowBuilder.clickByIndex(
    //   selectors.connectionsPagePO.HELPTEXT_CLOSE,
    //   0
    // );

    //T30774
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.EXISTING_INTEGRATION_LIST,
      "Existing integration list is not displayed"
    );

    //T30810
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEXT,
      "Next button is not displayed"
    );
    const nextButton = await page.$(selectors.syncPagePO.NEXT);
    expect(await nextButton.getAttribute("class")).toContain("Mui-disabled");

  });
});
