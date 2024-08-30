import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63015 Verify API Type Radio button should be always blue`, () => {
  test(`@Env-All @Zephyr-IO-T21806 C63015 Verify API Type Radio button should be always blue`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    const color = await page
      .locator(`${selectors.connectionsPagePO.NARVAR_CONNECTION} [role="radiogroup"]`)
      .evaluate((el: any) => getComputedStyle(el.parentElement).color);
    await io.assert.expectToBeValue(
      color,
      "rgb(51, 61, 71)",
      "API Type Radio button is not blue"
    );
  });
});
