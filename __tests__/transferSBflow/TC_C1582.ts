import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C1582  Verify,When two integrations have same connections, when trying to transfer one integration, it must provide a validation that the same connection is used in another integration`, () => {
    test(`@Env-All @Zephyr-IO-T6912 C1582 Verify,When two integrations have same connections, when trying to transfer one integration, it must provide a validation that the same connection is used in another integration UI_Backlog`, async ({ page, io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
        await io.myAccountPage.clickByText("Create transfer");
        await io.homePage.loadingTime()
        await io.myAccountPage.fill(`${selectors.basePagePO.EMAIL} input`, process.env.IO_UserName)
        await io.myAccountPage.click('[data-test="_integrationIds"]');
        await io.myAccountPage.clickByTextByIndex('Automation Flows', 0);
        await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.CHECKBOX, 0);
        await io.myAccountPage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.myAccountPage.click(selectors.integrationPagePO.NEXT);
        //Validating message visible
        await io.homePage.addStep("Message is showing correctly without showing initiate transfer");
        await expect(page.locator(selectors.integrationPagePO.NEXT)).not.toHaveCSS("Initiate transfer", "Transfer");
    });
});
