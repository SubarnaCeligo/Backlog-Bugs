import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import file from "fs";

test.describe("C106421 Verify user is able to click and download the yaml file to their system", () => {
  test("@Zephyr-IO-T23713 @Env-All @Priority-P2 C106421 Verify user is able to click and download the yaml file to their system", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("TC_C68544_DND", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    let advance = page.locator(selectors.importPagePO.ADVANCED);
    await advance.scrollIntoViewIfNeeded();
    await advance.click();
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent("download");
    await io.flowBuilder.clickByTextByIndex("Download OpenAPI spec", 0);
    const download = await downloadPromise;
    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs("../flowBuilder01/" + download.suggestedFilename());
    expect(download.suggestedFilename()).toContain(".yaml");
    let stats = file.statSync("../flowBuilder01/" + download.suggestedFilename());
    expect(stats.isFile()).toEqual(true);
    await download.delete();
  });
});
