import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33167 Verify When there are unsaved changes and user tries to close the drawer, it should trigger the Leave popup dialouge for edit lookup page`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`@Priority-P2 @Zephyr-IO-T2626 @Env-All C33167`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    // await io.flowBuilder.clickByText("REST API (HTTP)");

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "REST API (HTTP)");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);await io.flowBuilder.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "3PL CONNECTION");
    await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "3PL CONNECTION" })
      .first()
      .click()
    
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "C27977");
    await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
    await io.flowBuilder.clickByText("GET");
    await io.flowBuilder.fill(
      selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI,
      "/"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESCRIPTION, "test");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await expect(page.getByRole("dialog")).toBeVisible();
    await io.flowBuilder.addStep("Verified the leave dialog is visible");
  });
});
