import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C64900 Validate editing the iClient created in Resources -> iClient page, editing from the connection page, is Simple view is displayed for the applicable applications`, () => {
  test(`C64900 Validate editing the iClient created in Resources -> iClient page, editing from the connection page, is Simple view is displayed for the applicable applications`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "iClients");
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.APPLICATION);
    await io.flowBuilder.clickByText("3PL Central");
    await io.assert.verifyElementIsDisplayed(
      // todo replace: selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA
      '[data-test="oauth2.clientCredentialsLocation"]',
      "'Send client credentials via' is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      // todo replace: selectors.connectionsPagePO.ACCESS_TOKEN_URL
      '[data-test="oauth2.token.uri"]',
      "'Access token URL' is not displayed"
    );
    await io.connectionPage.addStep("Verified HTTP form is displayed");
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "connections"
    );
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    // todo replace: selectors.connectionsPagePO.THREEPL_CONNECTION
    await io.flowBuilder.click('[data-test="3PL Central"]');
    await io.flowBuilder.click('[aria-label="Create iClient"]');
    await expect(page.getByRole("button", { name: "Simple" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await io.connectionPage.addStep("Verified Simple form is displayed");
  });
});
