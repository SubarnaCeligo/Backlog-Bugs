import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C28172 Verify export type dropdown values are updated in HTTP/REST and all other exports and lookups`, () => {
  test(`C28172 Verify export type dropdown values are updated in HTTP/REST and all other exports and lookups`, async ({
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
    await expect(page.getByText("All – always export all data")).toBeVisible();
    await expect(
      page.getByText("Delta – export only modified data")
    ).toBeVisible();
    await expect(page.getByText("Once – export records only once")).toBeVisible();
    await expect(
      page.getByText("Limit – export a set number of records")
    ).toBeVisible();
  });
});
