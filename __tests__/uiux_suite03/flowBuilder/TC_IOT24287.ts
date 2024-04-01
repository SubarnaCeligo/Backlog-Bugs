import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT4287 Test to verify Marketplace flow steps field is showing with and without choosing application`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Epic-IO-56742 @Priority-P2 @Zephyr-IO-T4287", async ({ io }) => {
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Create");
        await io.homePage.click(selectors.homePagePO.CREATEFLOW);
        await io.flowBuilder.clickAddSource();

        await io.flowBuilder.waitForElementAttached("text='Marketplace flow steps'");
        await io.assert.verifyElementIsDisplayed("text='Marketplace flow steps'", 'Marketplace flow steps header is not present');
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
        await io.flowBuilder.waitForElementAttached (selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES)
        await io.flowBuilder.waitForElementAttached("text='Marketplace flow steps'");
        await io.assert.verifyElementIsDisplayed("text='Marketplace flow steps'", 'Marketplace flow steps header is not present after selecting the application');

    });
});