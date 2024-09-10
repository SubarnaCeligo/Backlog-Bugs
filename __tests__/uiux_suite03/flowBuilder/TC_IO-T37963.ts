import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify User is able to create the GitHub real time listener from Flow Builder page", () => {
    test("@Bug-IO-92868 @Env-All @Priority-P2 @Zephyr-IO-T37963", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'GitHub');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GIT_HUB);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Listen for real-time data from source application');
        await io.flowBuilder.clickByText("Create flow step");
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'GitHub Listener');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.WEBHOOK_KEY_INPUT, '1234');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementDisplayedByText("DESTINATIONS & LOOKUPS", "Page not re-directing properly")
    });
});