import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C28173 Verify the message “Add {{lastExportDateTime}} to either the relative URI or HTTP request body to complete the setup.” is displayed if export type is delta selected in HTTP/REST export`, () => {
  test(`C28173 Verify the message “Add {{lastExportDateTime}} to either the relative URI or HTTP request body to complete the setup.” is displayed if export type is delta selected in HTTP/REST export`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.delay(2000);
    await io.flowBuilder.clickByText("HTTP");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.delay(2000);
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.flowBuilder.clickByText("Delta – export only modified data");
    const message = page.getByText(
      "Add {{lastExportDateTime}} to either the relative URI or HTTP request body to complete the setup."
    );
    await expect(message).toBeVisible();
  });
});
