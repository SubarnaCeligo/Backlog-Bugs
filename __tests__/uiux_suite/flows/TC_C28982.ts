import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C28982 Verify Connection status is displaying correctly in create export/ import form`, () => {
  test(`C28982 Verify Connection status is displaying correctly in create export/ import form`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    const flowBuilderLocator = page.getByText("Flow builder");
    if (await flowBuilderLocator.isVisible()) {
      await io.homePage.clickByText("Flow builder");
    } else {
      await io.homePage.clickByText("Tools");
      await io.homePage.clickByText("Flow builder");
    }
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.delay(2000);
    await io.flowBuilder.clickByText("HTTP");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    const statusDot = page.getByRole("status");
    await expect(page.getByText("Online")).toBeVisible();
    await expect(statusDot).toHaveCSS("background-color", "rgb(76, 187, 2)");
  });
});
