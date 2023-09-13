import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C27977");
    await io.flowBuilder.click('[data-test="http.blobMethod"]');
    await io.flowBuilder.clickByText("GET");
    await io.flowBuilder.fill("[id='text-http.relativeURI']", "/");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESCRIPTION, "test");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    expect(page.getByRole("dialog")).toBeVisible();
    await io.flowBuilder.addStep("Verified the leave dialog is visible");
  });
});
