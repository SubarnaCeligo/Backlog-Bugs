import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('IO-T25376 Verify clicking anywhere in panel should select the role', () => {

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });
  test('@Zephyr-IO-T25376 @Env-All IO-T25376 Verify clicking anywhere in panel should select the role', async ({
    io,
    page
  }) => {

    await io.myAccountPage.addStep("Navigated to Accounts Page URL");
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.loadingTime();
    await io.homePage.clickByText("Invite user");
    await io.myAccountPage.loadingTime();
    await io.myAccountPage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1)
    const selectedRole = page.locator('div:nth-child(4) > div > .MuiFormGroup-root > div');
    await selectedRole.hover();
    await expect(selectedRole).toHaveCSS("border-color", "rgb(29, 118, 199)");
  });
});
