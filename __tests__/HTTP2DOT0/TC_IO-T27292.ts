import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`IO-T27292 Verify the user is able to see the existing "Access token path" moved from "Configure token auth" field to “OAuth 2.0 overrides” field`, () => {
  test('@Env-All @Zephyr-IO-T27292 @Priority-P2  Verify the user is able to see the existing "Access token path" moved from "Configure token auth" field to “OAuth 2.0 overrides” field', async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "iClients");
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.click(selectors.importPagePO.NAME);
    await io.homePage.fill(selectors.importPagePO.NAME, "Test");
    await io.homePage.click(selectors.basePagePO.OATHGRANT_TYPE);
    await io.homePage.clickByText('Authorization code');
    await io.homePage.clickByText('OAuth 2.0 overrides');
    await io.assert.verifyElementDisplayedByText('Override path to access token field in the HTTP response body', "Modified Access Token Path is not displayed correctly.");
    await io.assert.verifyElementDisplayedByText('Override path to refresh token field in the HTTP response body', "Refresh Token new field is not added properly");
    await io.homePage.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 13);
    await io.assert.verifyElementDisplayedByText('Provide your access token path if it differs from the default access_token relative path in the HTTP response body.', 'Help text for access token path is not displayed properly');
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN );
    await io.homePage.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 16);
    await io.assert.verifyElementDisplayedByText('Provide your refresh token path if it differs from the default refresh_token relative path in the HTTP response body.', 'Refresh token help text is not displayed properly');
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN );
    await io.homePage.clickByText('OAuth 2.0 overrides');
    await io.homePage.clickByText('Configure token auth');




  });
});