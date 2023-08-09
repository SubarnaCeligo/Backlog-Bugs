import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Standalone flows");
    await io.flowBuilder.clickByText("test http flow");
    // TODO: selectors.flowBuilderPagePO.TRANSFER
    await io.flowBuilder.click("[data-test='Transfer']");
    // TODO: selectors.flowBuilderPagePO.DESCRIPTION
    await io.flowBuilder.fill("#description input", "test");
    // TODO: selectors.flowBuilderPagePO.CLOSE
    await io.flowBuilder.click("[data-test='cancel']");
    expect(page.getByRole("dialog")).toBeVisible();
  });
});
