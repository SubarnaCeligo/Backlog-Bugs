import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("T4493 To verify field labels present in REST connection drawer is Changed as per new modification UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("T4493 To verify field labels present in REST connection drawer is Changed as per new modification UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'REST API (HTTP)');
    await io.connectionPage.click(selectors.connectionsPagePO.RESTAPI_HTTP);

    await io.connectionPage.clickByText('General');

    // Check for fields within the "Application details" section
    await io.assert.verifyElementDisplayedByText('Override media type for success responses', 'Override media type for success responses is not displayed');
    await io.assert.verifyElementDisplayedByText('Override media type for error responses', 'Override media type for error responses is not displayed');
    await io.connectionPage.clickByText('Application details');

    // Check for fields within the "Non-standard API rate limiter" section
    await io.assert.verifyElementDisplayedByText('Non-standard API rate limiter', 'Non-standard API rate limiter is not displayed');
    await io.connectionPage.clickByText('Non-standard API rate limiter');
    await io.assert.verifyElementDisplayedByText('Override HTTP status code for rate-limit errors', 'Override HTTP status code for rate-limit errors is not displayed');
    await io.assert.verifyElementDisplayedByText('Path to rate-limit error field in HTTP response body', 'Path to rate-limit error field in HTTP response body is not displayed');
    await io.assert.verifyElementDisplayedByText('Override retry-after HTTP response header name', 'Override retry-after HTTP response header name is not displayed');
    await io.connectionPage.clickByText('Non-standard API rate limiter');

    // Check for fields within the "How to test this connection?" section
    await io.assert.verifyElementDisplayedByText('How to test this connection?', 'How to test this connection is not displayed');
    await io.connectionPage.clickByText('How to test this connection?');
    await io.assert.verifyElementDisplayedByText('Relative URI', 'Relative URI is not displayed');
    await io.assert.verifyElementDisplayedByText('HTTP method', 'HTTP method is not displayed');
    await io.connectionPage.click(selectors.connectionsPagePO.PING_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "POST");
    await io.assert.verifyElementDisplayedByText('HTTP request body', 'HTTP request body is not displayed');
    await io.assert.verifyElementDisplayedByText('Path to success field in HTTP response body', 'Path to success field in HTTP response body is not displayed');
    await io.assert.verifyElementDisplayedByText('Success values', 'Success values is not displayed');
    await io.assert.verifyElementDisplayedByText('Path to error field in HTTP response body', 'Path to error field in HTTP response body is not displayed');
    await io.assert.verifyElementDisplayedByText('Error values', 'Error values is not displayed');
    await io.assert.verifyElementDisplayedByText('Path to detailed error message field in HTTP response body', 'Path to detailed error message field in HTTP response body is not displayed');
    await io.connectionPage.clickByText('How to test this connection?');

    // Check for fields within the "Non-standard API response patterns" section
    await io.assert.verifyElementDisplayedByText('Non-standard API response patterns', 'Non-standard API response patterns is not displayed');
    await io.connectionPage.clickByText('Non-standard API response patterns');
    await io.assert.verifyElementDisplayedByText('Override HTTP status code for auth errors', 'Override HTTP status code for auth errors is not displayed');
    await io.assert.verifyElementDisplayedByText('Path to auth error field in HTTP response body', 'Path to auth error field in HTTP response body is not displayed');
    await io.assert.verifyElementDisplayedByText('Auth error values', 'Auth error values is not displayed');

    // Check for fields within the "Configure authentication" section
    await io.assert.verifyElementDisplayedByText('Configure authentication', 'Configure authentication is not displayed');

    // check for sub-section fields when auth is basic
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "basic");
    await io.assert.verifyElementDisplayedByText('Configure basic auth', 'Configure basic auth is not displayed');

    // check for sub-section fields when auth is digest
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "digest");
    await io.assert.verifyElementDisplayedByText('Configure digest auth', 'Configure digest auth is not displayed');

    // check for sub-section fields when auth is cookie
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "cookie");
    await io.assert.verifyElementDisplayedByText('Configure cookie auth', 'Configure cookie auth is not displayed');
    const absoluteURLElement = await page.$(selectors.connectionsPagePO.ABSOLUTE_URL_LABEL);
    const absoluteURLLabel = await absoluteURLElement.innerText();
    expect(absoluteURLLabel).toContain("Absolute URL");
    await io.assert.verifyElementDisplayedByText('Override HTTP status code for success', 'Override HTTP status code for success is not displayed');

    // check for sub-section fields when auth is custom
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "custom");
    await io.assert.verifyElementDisplayedByText('Configure custom auth', 'Configure custom auth is not displayed');
    await io.assert.verifyElementDisplayedByText('Custom encrypted fields', 'Custom encrypted fields is not displayed');
    await io.assert.verifyElementDisplayedByText('Custom unencrypted fields', 'Custom unencrypted fields is not displayed');

    // check for sub-section fields when auth is token
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "token");
    await io.assert.verifyElementDisplayedByText('Configure token auth', 'Configure token auth is not displayed');
    const locationElement = await page.$(selectors.connectionsPagePO.LOCATION_LABEL);
    const locationLabel = await locationElement.innerText();
    expect(locationLabel).toContain("Send token via");
    await io.connectionPage.click(selectors.connectionsPagePO.LOCATION);
    await io.connectionPage.selectTextfromDropDown(page, "header");
    await io.assert.verifyElementDisplayedByText('Header scheme', 'Header scheme is not displayed');
    await io.connectionPage.click(selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN);
    await io.assert.verifyElementDisplayedByText('Path to token field in the HTTP response body', 'Path to token field in the HTTP response body is not displayed');
    await io.connectionPage.click(selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN);

    // check for sub-section fields when auth is wsse
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "wsse");
    await io.assert.verifyElementDisplayedByText('Configure WSSE auth', 'Configure WSSE auth is not displayed');

    // check for sub-section fields when auth is oauth2
    await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "oauth");
    await io.assert.verifyElementDisplayedByText('Configure OAuth 2.0', 'Configure OAuth 2.0 is not displayed');
    const oauthClientElement = await page.$(selectors.connectionsPagePO.OAUTH_TWO_CLIENT_LABEL);
    const oauthClientLabel = await oauthClientElement.innerText();
    expect(oauthClientLabel).toContain("OAuth 2.0 client");
    await io.assert.verifyElementDisplayedByText('Scope', 'Scope is not displayed');
    await io.connectionPage.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 1);
    await io.connectionPage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.connectionPage.selectTextfromDropDown(page, "clientcredentials");
    const oauthLocationElement = await page.$(selectors.connectionsPagePO.CLIENT_LOCATION_LABEL);
    const oauthLocationLabel = await oauthLocationElement.innerText();
    expect(oauthLocationLabel).toContain("Send client credentials via");
    await io.assert.verifyElementDisplayedByText('OAuth 2.0 overrides', 'OAuth 2.0 overrides is not displayed');
    await io.connectionPage.clickByText('OAuth 2.0 overrides');
    await io.assert.verifyElementDisplayedByText('Override default scope delimiter', 'Override default scope delimiter is not displayed');
    await io.assert.verifyElementDisplayedByText('Override access token HTTP headers', 'Override access token HTTP headers is not displayed');
    await io.assert.verifyElementDisplayedByText('Override access token HTTP request body', 'Override access token HTTP request body is not displayed');
    await io.assert.verifyElementDisplayedByText('Override revoke token HTTP headers', 'Override revoke token HTTP headers is not displayed');
    await io.assert.verifyElementDisplayedByText('Override revoke token HTTP request body', 'Override revoke token HTTP request body is not displayed');
  });
});