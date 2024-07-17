import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe(`C69768 getting unknown error if we are saving dataloader first time wit file type XLSx`, () => {
  test(`@Env-All @Zephyr-IO-T20885 C69768 getting unknown error if we are saving dataloader first time wit file type XLSx`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Tools", "Data loader");
    await io.homePage.loadingTime()
    await page
      .getByText(
        "You can add a destination application once you complete the configuration of your data loader."
      )
      .waitFor({ state: "visible" });
    await io.flowBuilder.click(selectors.basePagePO.DATA_LOADER);
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText("XLSX");
    await io.flowBuilder.clickByText("File has header");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/dataloader/C69768.xlsx");
    await io.homePage.addStep("Uploaded xlsx file");
    await expect(page.getByText("Some unknown error")).not.toBeVisible();
    await io.homePage.addStep("Verified unknown error is not displayed");
  });
});