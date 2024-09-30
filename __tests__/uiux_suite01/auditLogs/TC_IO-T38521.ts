import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T38519 @Zephyr-IO-T38521'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @Zephyr-IO-T38519 @Zephyr-IO-T38521'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();
        await io.myAccountPage.waitForElementAttached('[data-test="AuditLogDateFilter"]');

        //IO-T38519 Verify new field added on Audit log page in Sandbox
        await io.assert.verifyElementIsDisplayed(
            '[data-test="AuditLogDateFilter"]',
            "Element is not displayed properly"
        );

        await io.flowBuilder.hover('[data-test="AuditLogDateFilter"]');
        await io.homePage.loadingTime();
        const ediTextElement = page.locator('[data-test="AuditLogDateFilter"]');
        const ediTextColor = await ediTextElement.evaluate(el => {
            return window.getComputedStyle(el).color;
        });
        expect(ediTextColor).toBe("rgb(51, 61, 71)");
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.flowBuilder.loadingTime();
    });
});