import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C33307.json";

test.describe("C33307 Verify if the checkbox is checked user should be see the relative time format and when they mousehover the timestamp column field relative format is displayed and the vice versa.", () => {
  test("C33307Verify if the checkbox is checked user should be see the relative time format and when they mousehover the timestamp column field relative format is displayed and the vice versa.", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    );
    const inputElement = await page.$(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    );
    const valueAttribute = await inputElement.getAttribute("value");
    if (valueAttribute === "false") {
      await io.myAccountPage.click(
        selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
      );
      await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
    }
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("TC_50858", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible", timeout: 180000 });
    await io.assert.verifyElementIsDisplayed(
      selectors.myAccountPagePO.LOCAL_DATE_TIME,
      "Exact time and date format is not  displayed when hovered over the Relative time format."
    );
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(
      selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
    );
    await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Automation Flows");
    await io.homePage.clickByTextByIndex("TC_50858", 0);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
  });
});
