import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63015 Verify user is able to see API Type field with description, name, and radio input`, () => {
  test(`@Env-All @Zephyr-IO-T21806 C63015 Verify user is able to see API Type field with description, name, and radio input`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    const apiTypeOption = page.locator(
      selectors.connectionsPagePO.NARVAR_CONNECTION
    );
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.NARVAR_CONNECTION,
      "Narvar"
    );
    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.NARVAR_CONNECTION,
      "Choose to enable post purchase services, such as orders and shipments."
    );
    await expect(apiTypeOption.getByRole("radio")).toBeVisible();
  });
});
