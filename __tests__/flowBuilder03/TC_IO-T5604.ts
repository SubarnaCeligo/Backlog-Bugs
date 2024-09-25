import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO-5604 Verify the background of preview output panels in AFEs should be grey in different browsers( Chrome, Safari, Firefox)", () => {
  test("@Zephyr-IO-T5604 @Env-All @Priority-P2 T5604 Verify the background of preview output panels in AFEs should be grey in different browsers( Chrome, Safari, Firefox)", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.TOOLS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
        await io.myAccountPage.clickByText("Transfer files into destination application"); 
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
        await io.homePage.loadingTime();
        const element = page.locator(selectors.flowBuilderPagePO.FILE_KEY);
        await element.scrollIntoViewIfNeeded();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FILE_KEY);
        let afePanel = await page.locator(selectors.flowBuilderPagePO.AFE_PREVIEW_PANEL);
        await expect(afePanel).toHaveCSS("background-color", "rgb(240, 245, 249)");
  });
});
