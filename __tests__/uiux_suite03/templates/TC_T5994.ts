import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`T5994 Template: Verify previously selected applications are highlighted with checkbox`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test(`@Zephyr-IO-T5994 @Env-All T5994 Template: Verify previously selected applications are highlighted with checkbox`, async ({
        io,
        page
    }) => {
        const templateNameSuffix = "IO-T5994" + Math.random().toString(36).substring(7);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText("Templates");
        await io.homePage.addStep("Navigated to templates page");
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Create template");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, templateNameSuffix);
        await io.homePage.addStep("*** Adding template name ***");
        await io.flowBuilder.fill(selectors.templatePagePO.CONTACT_MAIL, process.env["IO_UserName"]);
        await io.homePage.addStep("*** Adding contact email ***");
        await io.flowBuilder.enterHugeData(selectors.templatePagePO.CHOOSE_APPLICATION, 'Netsuite JDBC');
        await io.flowBuilder.click(selectors.templatePagePO.NS_JDBC);
        await io.flowBuilder.enterHugeData(selectors.templatePagePO.CHOOSE_APPLICATION, 'Netsuite JDBC');
        await io.assert.expectToBeTrue(await (await page.$(selectors.dashboardPagePO.FA_FILTER_CHECKBOX)).isChecked(), "New API is not checked");
    });
});