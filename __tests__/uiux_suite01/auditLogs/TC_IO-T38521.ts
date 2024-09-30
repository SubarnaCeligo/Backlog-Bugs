import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T38519 @Zephyr-IO-T38521'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Bug-IO-97121 @Priority-P2 @Env-QA @Zephyr-IO-T38519 @Zephyr-IO-T38521'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();
        await io.myAccountPage.waitForElementAttached(selectors.homePagePO.AUDIT_FILTER);

        //IO-T38519 Verify new field added on Audit log page in Sandbox
        await io.assert.verifyElementIsDisplayed(
            selectors.homePagePO.AUDIT_FILTER,
            "Element is not displayed properly"
        );

        await io.flowBuilder.hover(selectors.homePagePO.AUDIT_FILTER);
        await io.homePage.loadingTime();
        const ediTextElement = page.locator(selectors.homePagePO.AUDIT_FILTER);
        const ediTextColor = await ediTextElement.evaluate(el => {
            return window.getComputedStyle(el).color;
        });
        expect(ediTextColor).toBe("rgb(51, 61, 71)");
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.flowBuilder.loadingTime();
    });
});