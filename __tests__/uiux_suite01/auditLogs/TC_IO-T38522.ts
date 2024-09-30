import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify new field added on the different places to filter Audit log with dates'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @Zephyr-IO-T38522'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        //Resource drawer:
        const sections = ["Connections", "Imports", "Exports", "Agents", "iClients", "API tokens", "Stacks", "My APIs", "Scripts"];
        for (const section of sections) {
            await io.homePage.loadingTime();
            await io.homePage.goToMenu("Resources", section);
            await io.homePage.loadingTime();
            await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
            await io.homePage.click(selectors.basePagePO.AUDITLOG);
            await io.homePage.loadingTime();
            await io.assert.verifyElementIsDisplayed('[data-test="AuditLogDateFilter"]', "Element is not displayed properly on");
            await io.homePage.click(selectors.flowBuilderPagePO.CLOSEPOPUP);
        }

        //Flowbuilder page
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
        await io.homePage.loadingTime();
        await io.assert.verifyElementIsDisplayed('[data-test="AuditLogDateFilter"]', "Element is not displayed properly on");
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
        await io.homePage.click(selectors.basePagePO.AUDITLOG);
        await io.homePage.loadingTime();
        await io.assert.verifyElementIsDisplayed('[data-test="AuditLogDateFilter"]', "Element is not displayed properly on");
        await io.homePage.click(selectors.flowBuilderPagePO.CLOSEPOPUP);
        await io.homePage.loadingTime();

        //Integration Page
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();
        await io.assert.verifyElementIsDisplayed('[data-test="AuditLogDateFilter"]', "Element is not displayed properly on");

        //Register connection page
        await io.homePage.click(selectors.basePagePO.CONNECTIONS);
        await io.homePage.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 0);
        await io.homePage.click(selectors.basePagePO.AUDITLOG);
        await io.homePage.loadingTime();
        await io.assert.verifyElementIsDisplayed('[data-test="AuditLogDateFilter"]', "Element is not displayed properly on");
    });
});