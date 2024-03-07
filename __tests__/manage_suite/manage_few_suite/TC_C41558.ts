import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41558 To verify create pull button is displayed under 'Revisions' tab for Templates(users who has Integration level manage access)", () => {
  test("C41558 To verify create pull button is displayed under 'Revisions' tab for Templates(users who has Integration level manage access)", async ({
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Revisions");
    await io.assert.verifyElementIsDisplayed(
      selectors.integrationPagePO.CREATE_PULL,
      "Element is not displayed properly"
    );
  });
});
