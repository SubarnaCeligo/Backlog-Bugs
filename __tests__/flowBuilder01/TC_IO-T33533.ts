import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Existing/marketplace flow steps re-load properly when user removes the application selected on 'Create source' form", () => {
  test("@Bug-IO-83420 @Priority-P2 @Zephyr-IO-T33533 @Env-All", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
        await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.CLEAR_APPLICATION,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.flowBuilder.loadingTime();
        const sele = await page.$$(selectors.flowBuilderPagePO.RESOURCE_NAME);
        const value = await sele[0].textContent();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.CLEAR_APPLICATION,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
        await io.flowBuilder.loadingTime();
        const value1 = await sele[0].textContent();
        await io.assert.expectToContainValue(value, value1, "re-load is not happening");

  });
});
