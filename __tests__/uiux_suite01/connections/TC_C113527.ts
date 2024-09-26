import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C113527 Verify user is able to create connection using Password credentials Grant type iclient`, () => {
  test(`@Env-All @Zephyr-IO-T7782 C113527 Verify user is able to create connection using Password credentials Grant type iclient`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(
      selectors.connectionsPagePO.CREATE_CONNECTION
    );
    //Wait for the page to load
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Fulfillment.com');
    await io.connectionPage.waitForElementAttached(selectors.flowBuilderPagePO.FULFILLMENT);
    await io.connectionPage.click(selectors.flowBuilderPagePO.FULFILLMENT);

    // await io.connectionPage.clickByText("Fulfillment.com");
    await io.connectionPage.waitForElementAttached(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)
    await io.connectionPage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.BASE_URI_INPUT);
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "Fulfillment");

    // await io.connectionPage.clickByText("Token");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.OAUTH);
    await io.connectionPage.clickByText("OAuth 2.0");

    await io.connectionPage.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://api.fulfillment.com/v2");

    await io.connectionPage.clickByTextByIndex("Please select", 0);
    await io.connectionPage.clickByText("FULFILLMENT ICLIENT");

    await io.connectionPage.clickByText("How to test this connection?");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.RELATIVE_URI_INPUT);
    await io.connectionPage.fill(selectors.connectionsPagePO.RELATIVE_URI_INPUT, "");
    await io.connectionPage.addStep("Filled the connection form");

    await io.connectionPage.clickByText("Test connection");
    await io.connectionPage.addStep("Test connection");

    await io.connectionPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);
    let message = (await io.connectionPage.getText(selectors.basePagePO.NOTIFICTION_BAR)).toString();
  
    await io.assert.expectToContainValue("Your connection is working great! Nice Job!", message,  "Offline connection");
    await io.connectionPage.addStep("Verified that user is able to create connection using Password credentials Grant type iclient");
  });
});
