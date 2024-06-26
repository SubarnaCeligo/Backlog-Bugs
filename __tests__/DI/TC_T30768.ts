import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Ladi Manish T30768", () => {
  test("@Env-All @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30768 @Zephyr-IO-T30769 T30768", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Create");
    //T30768 T30769
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_SYNC_INTEGRATION,
      "Create sync is not displayed"
    );
    //T30773
    await io.flowBuilder.click(selectors.syncPagePO.CREATE_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEW_SYNC_INTEGRATION,
      "Create integration is not displayed"
    );
    //T30793 existing integration help text
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT
    );
    await io.assert.verifyElementContainsText(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,
      "text to be added"
    );
    await io.flowBuilder.clickByIndex(
      selectors.connectionsPagePO.HELPTEXT_CLOSE,
      0
    );

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
    //T30781
    await io.flowBuilder.click(selectors.syncPagePO.FIRST_INTEGRATION);

    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEXT,
      "Next button is not displayed"
    );
    //T30771
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CLOSE_INTEGRATION_DRAWER,
      "Close(*) button is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.CLOSE,
      "Close button is not displayed"
    );
    //T30776
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.OR_SEPARATOR,
      "Or separator is not displayed"
    );
  });
});
