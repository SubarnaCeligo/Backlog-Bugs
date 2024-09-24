import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T31357 @Zephyr-IO-T31370 @Zephyr-IO-T31373 @Zephyr-IO-T31371", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-80150 @Priority-P2 @Env-All @Zephyr-IO-T31357 @Zephyr-IO-T31370", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        //IO-T31357 Verify the filter options added on create source page
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await page.keyboard.type("Element is not displayed properly");
        //Placeholder value = "Optionally filter by connection"
        // const filter = await io.flowBuilder.isVisible("text='Optionally filter by connection'")
        // await io.assert.expectToBeTrue(filter, "Placeholder is not showing");
        // //IO-T31370 The edit button should not display after hovering over the connection.
        // await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        // await page.keyboard.type("Invalid connection");
        // await io.flowBuilder.loadingTime();
        //"No available connections match your search" message should display
        const msg = await io.flowBuilder.isVisible("text='No available connections match your search'")
        await io.assert.expectToBeTrue(msg, "Label is not Updated");
    });
    test("@Epic-IO-80150 @Priority-P2 @Env-All @Zephyr-IO-T31371", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Accelo');
        await io.flowBuilder.click(selectors.connectionsPagePO.ACCELO);
        await io.homePage.loadingTime();
        //Connection filter should not show Instead, retain the message "No results found.".
        const filter = await io.flowBuilder.isVisible("text='No results found.'")
        await io.assert.expectToBeTrue(filter, "Message is not displayed");
        const connfilter = await io.assert.checkElementState(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'isDisplayed');
        await io.assert.expectToBeFalse(connfilter, 'Status is displyed');

    });
    test("@Epic-IO-80150 @Priority-P2 @Env-All @Zephyr-IO-T31373", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();


    });
});