import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C77873 HTTP connection-- for 0auth 2.0 Auth type while creating the OAuth 2.0 iclient `, () => {
  test(`@Env-All @Zephyr-IO-T21620 C77873 HTTP connection-- for 0auth 2.0 Auth type while creating the OAuth 2.0 iclient `, async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.importPagePO.HTTP_IMPORT);
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.exportsPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await expect(
      page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)
    ).not.toBeVisible();
    await io.connectionPage.addStep("Verified 'Simple' toggle is not visible");
    await io.connectionPage.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.connectionPage.click(selectors.basePagePO.CLOSE);
    await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.LITMOS_CONNECTION);
    await io.connectionPage.delay(1000);
    await io.connectionPage.click(selectors.importPagePO.HTTP_IMPORT);
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("OAuth 2.0");
    await io.exportsPage.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await expect(page.getByRole("button", { name: "Simple" })).toBeVisible();
    await io.connectionPage.addStep("Verified 'Simple' toggle is visible");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.NAME,
      "'Name' field not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "'Client ID' field not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "'Client Secret' field not displayed"
    );
  });
});
