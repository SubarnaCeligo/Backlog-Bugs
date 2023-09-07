import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27977 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in HTTP/REST lookup additional files`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C27977 Verify the fields in 'Non-standard API response patterns' section are updated as per requirement in HTTP/REST lookup additional files`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Standalone flows");
    await io.flowBuilder.clickByText("test http flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByText("Non-standard API response patterns");
    expect(page.getByText("Path to file in HTTP response body")).toBeVisible();
  });
});
