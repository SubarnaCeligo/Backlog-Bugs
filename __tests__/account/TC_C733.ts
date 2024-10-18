import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C733 from "@testData/MyAccount/C733.json";

test.describe("C733 Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.myAccountPage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T1384 C733 Verify when user is logged with google account, Name and Emailfields vaules should be displayed by default", async ({
    io,
    page
  }) => {
    const expectedDefaultValue = process.env["IO_UserName"];
    const expectedName = C733.name;
    const emailInput = await page.waitForSelector(
      `input${selectors.myAccountPagePO.EMAIL_INPUT}`
    );
    const nameInput = await page.waitForSelector(
      selectors.flowBuilderPagePO.FLOW_NAME
    );

    const actualEmailValue = await emailInput.getAttribute("value");
    const actualNameValue = await nameInput.getAttribute("value");

    io.assert.expectToBeValue(
      expectedDefaultValue,
      actualEmailValue,
      "Email is invalid"
    );
    io.assert.expectToBeValue(expectedName, actualNameValue, "Name is invalid");
  });
});
