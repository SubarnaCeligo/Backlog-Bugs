import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, () => {
  test(`C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.connectionPage.click(
      selectors.connectionsPagePO.NARVAR_RMA_CONNECTION
    );
    await io.connectionPage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.connectionPage.fill(selectors.connectionsPagePO.USERNAME, "narvar");
    await io.connectionPage.fill(
      selectors.connectionsPagePO.PASSWORD,
      "E59E404A332C1692B4CB1D63103E5520"
    );
    await io.connectionPage.fill(
      selectors.connectionsPagePO.STORENAME,
      "celigo-test-2"
    );
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await expect(
      page
        .locator(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION)
        .getByRole("radio")
    ).toBeChecked();
  });
});
