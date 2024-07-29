import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T11996 FTP - Verify 'decrypt files' checkbox is unchecked by default on export", () => {
  test("@Zephyr-TC_T11996 @Env-All   FTP - Verify 'decrypt files' checkbox is unchecked by default on export", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    // export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await expect(
      page.locator(selectors.importPagePO.CLICKPREVIEW)
    ).toBeDisabled();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await expect(
      page.getByText("Decrypt files")
    ).toBeDisabled();

  });
});