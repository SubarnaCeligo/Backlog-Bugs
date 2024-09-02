import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C117407 from '../../testData/inputData/Webhook_Listeners/C117407.json';

test.describe("C117407 Verify AFE window flow branching Router is showing Correct Input data", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T4961 @Env-All @Priority-P2 C117407 Verify AFE window flow branching Router is showing Correct Input data", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

        // Create a flow with webhook
        await io.createResourceFromAPI(C117407, "FLOWS");

        await io.homePage.loadingTime();

        // flow branching
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.homePage.loadingTime();
        await io.flowBuilder.getByRoleClick('menuitem','Add branching');
        await io.homePage.loadingTime();

        let divTextContent = await page.$(selectors.basePagePO.ACE_CONTENT);
        let inputContext = await divTextContent.textContent();

        await io.homePage.loadingTime();
        await io.homePage.loadingTime();

        let isValid = false
        if (inputContext.includes("cus") && inputContext.includes("John Doe")) {
            isValid = true
        }

        await expect(isValid).toBeTruthy();

    });
}); 