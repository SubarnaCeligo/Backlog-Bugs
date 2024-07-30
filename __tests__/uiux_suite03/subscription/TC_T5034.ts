import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

const emailToFind = "testssot5034@celigo.com";

test.describe("T5034 Verify inviting a user with monitor access from admin account when Require Account SSO? checkbox is checked.", () => {

  test("@Env-All @Zephyr-IO-T5034  Verify inviting a user with monitor access from admin account when Require Account SSO? checkbox is checked.", async ({ io, page }) => {
    const findAndDeleteUser = async () => {
      let response = await io.api.getCall("v1/ashares");
      const foundObject = response.find(obj => {
        return obj.sharedWithUser.email === emailToFind
      });

      const UserId = foundObject?._id;

      if (UserId) {
        const endPoint = "v1/ashares/" + UserId
        await io.api.deleteCall(endPoint);
      }
    }
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);

    await findAndDeleteUser();
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.clickByText('Invite user');
    await page.locator(selectors.myAccountPagePO.REQUIRE_SSO_TOGGLE).click();
    await page.locator(`${selectors.basePagePO.EMAIL} textarea[name='email']`).fill(emailToFind);
    await page.getByText('Can view all integrations (current and future integrations)').click();
    await page.click(selectors.basePagePO.INVITEUSER2);
    await page.locator(`${selectors.basePagePO.EMAIL} textarea[name='email']`).isHidden();
    await page.getByText(emailToFind).isVisible();
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await findAndDeleteUser();
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await page.getByText('Invite user').isVisible();
    await page.getByText(emailToFind).isHidden();

  });

});