import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C113527 Verify user is able to create connection using Password credentials Grant type iclient`, () => {
  test(`C113527 Verify user is able to create connection using Password credentials Grant type iclient`, async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(
      selectors.connectionsPagePO.CREATE_CONNECTION
    );
    await io.connectionPage.clickByText("Fulfillment.com");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.fill('[data-test="name"] input', "Fulfillment");

    await io.flowBuilder.clickByText("Token");
    await io.flowBuilder.clickByText("OAuth 2.0");

    await io.flowBuilder.fill('[data-test="http.baseURI"] input', "https://api.fulfillment.com/v2");

    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    await io.flowBuilder.clickByText("FULFILLMENT ICLIENT");

    await io.flowBuilder.clickByText("How to test this connection?");
    await io.flowBuilder.fill('[data-test="http.ping.relativeURI"] input', "/users/me");
    await io.connectionPage.addStep("Filled the connection form");

    await io.flowBuilder.clickByText("Save");
    await io.connectionPage.addStep("Saved the connection");
  
    await io.assert.verifyElementDisplayedByText("Your connection is working great! Nice Job!", "Offline connection");
    await io.connectionPage.addStep("Verified that user is able to create connection using Password credentials Grant type iclient");
  });
});
