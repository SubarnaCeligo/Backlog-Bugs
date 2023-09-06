import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Standalone flows");
    await io.flowBuilder.clickByText("test http flow");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESCRIPTION, "test");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    expect(page.getByRole("dialog")).toBeVisible();
  });
});
