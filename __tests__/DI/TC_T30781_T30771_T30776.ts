import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish Choose integration page validations 2", () => {
  test("@Env-All @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30781 @Zephyr-IO-T30771 @Zephyr-IO-T30776 Choose integration page validations 2", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.sync.clickOnCreateSync();

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
