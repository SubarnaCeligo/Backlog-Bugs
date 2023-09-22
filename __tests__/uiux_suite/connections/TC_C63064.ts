import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, () => {
  test(`C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    // TODO replace: selectors.connectionsPagePO.NARVAR_CONNECTION
    await io.connectionPage.click('[data-test="Narvar"]');
    // TODO replace: selectors.connectionsPagePO.NARVAR_RMA_CONNECTION
    await io.connectionPage.click('[data-test="Narvar RMA"]');
    await io.connectionPage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.connectionPage.fill(
      // TODO replace: selectors.connectionsPagePO.USERNAME
      '[data-test="http.auth.basic.username"] input',
      "narvar"
    );
    await io.connectionPage.fill(
      // TODO replace: selectors.connectionsPagePO.PASSWORD
      '[data-test="http.auth.basic.password"] input',
      "E59E404A332C1692B4CB1D63103E5520"
    );
    await io.connectionPage.fill(
      // TODO replace: selectors.connectionsPagePO.STORENAME
      '[data-test="http.unencrypted.storename"] input',
      "celigo-test-2"
    );
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    // TODO replace: await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.click('[data-test="Simple"]');
    await expect(
      // TODO replace: selectors.connectionsPagePO.NARVAR_RMA_CONNECTION
      page.locator('[data-test="Narvar RMA"]').getByRole("radio")
    ).toBeChecked();
  });
});
