import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S T29031- Verify that the cursor focus on the 'Application' field is getting set by default on create export/import/lookup page", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Priority-P2 @Env-All @Zephyr-IO-T29031 Verify that the cursor focus on the 'Application' field is getting set by default on create export/import/lookup page", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

        //Add Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

        //List of connectors would show if autofocus is enabled
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REDSHIFT);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REDSHIFT, 'Auto focus not enabled on application page');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);

        //Add destination/lookup data-test="Add destination / lookup"
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        //List of connectors would show if autofocus is enabled
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REDSHIFT);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REDSHIFT, 'Auto focus not enabled on application page');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    });
});