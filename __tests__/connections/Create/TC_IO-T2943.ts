import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`IO-T2943 Verify enterprise grid scopes is removed from the slack connection"`, () => {
  test(`@Env-All Verify enterprise grid scopes is removed from the slack connection"`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.SLACK_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_CONNECTION);
    await io.connectionPage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.CONFISCOPE,
      "SCOPE is not displayed"
    );

    await io.connectionPage.click(selectors.connectionsPagePO.CONFISCOPE);

    const enterpriseGridScope = [
      'admin.conversations:read',
      'admin.invites:read',
      'admin.invites:write',
      'admin.teams:read',
      'admin.teams:write',
      'admin.users:read',
      'admin.users:write',
      'app_mentions:read',
      'apps',
      'auditlogs:read',
      'bot',
      'channels:join',
      'channels:manage',
      'chat:write',
      'chat:write:bot',
      'conversations:history',
      'conversations:read',
      'conversations:write',
      'discovery:read',
      'discovery:write',
      'dnd:write:user',
      'emails:write',
      'files:write',
      'identity.avatar',
      'identity.avatar:read:user',
      'identity.basic',
      'identity.email',
      'identity.email:read:user',
      'identity.team',
      'identity.team:read:user',
      'identity:read:user',
      'ifttt',
      'reminders:read:user',
      'reminders:write:user',
      'rtm:stream',
      'users.profile:write:user'
    ];
    for (let i = 0; i < enterpriseGridScope.length; i++) {
      await expect(
       await page.getByText(enterpriseGridScope[i], { exact: true })
      ).not.toBeVisible();
    }
  });
});
