import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
test.describe("C271623_T27164_T27165_T27165", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.skip("C271623_T27164_T27165_T27165", async ({
    io,page
  }, testInfo) => {

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "EDI profiles");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, "ediProfileCase");
 
    const exportFilter = page.getByText('Control number sequence');
      while (!(await exportFilter.isVisible())) {
          await page.mouse.wheel(0, 600);
      }
      await io.assert.verifyElementDisplayedByText(
        "Control number sequence",
        "control number field is not found"
      );
      await io.flowBuilder.clickByText("Control number sequence");
      await io.flowBuilder.clickByText("Control number sequence");
    await io.connectionPage.click(selectors.homePagePO.CONTROL_NUMBER_HELP_TEXT);
    await io.connectionPage.fill(selectors.homePagePO.CONTROL_NUMBER_INPUT,"e");
    const secretText = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
        )) as string;
  
        await io.assert.expectToContainValue(
          `Control number valueThe control number, sequentially used in EDI messages for Interchange and Group level segments in fields ISA13, GS06, GE02, and IEA02, starts with a default value of '1'. This initial value is applied to the first EDI file, with each subsequent file's control number incrementing by 1. When the control number hits 999,999,999 (nine nines), it resets to the initially configured value by the user.Was this helpful?`,
          secretText,
          "secrettext name not found"
        );
    await io.assert.verifyElementDisplayedByText(
      "Value must be valid number from 1 - 999999999",
      "value field is accepting invalid data"
    );

  });
});
