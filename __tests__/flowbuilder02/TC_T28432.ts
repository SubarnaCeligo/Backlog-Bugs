import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("@Author_sagna123 TC_T28432_Test to validate checkbox is visible in HTTP export/lookup if we have exportSuccessMediaType is do not override and connectionSuccessMediaType is do not override and connectionMediaType is json", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-37655 @Priority-P2 @Zephyr-IO-T28432 @Env-All", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to connection page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create connection ***");
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
        await io.homePage.addStep("*** Selected HTTP application ***");
        await io.homePage.fill(selectors.basePagePO.NAME, "HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2");
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our connection ***");
        await io.homePage.fill(selectors.connectionsPagePO.MAGENTO2_BASE_URI, "https://d3v-celigolabs.zendesk.com/");
        await io.homePage.addStep("*** Typed base URI ***");
        await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.homePage.addStep("*** Clicked on Auth type selection field ***");
        await io.homePage.clickByText('Basic');
        await io.homePage.addStep("*** Selected Basic auth type ***");
        await io.loginPage.fill(selectors.connectionsPagePO.USERNAME, "celigo-labs@celigo.com");
        await io.loginPage.fill(selectors.connectionsPagePO.PASSWORD, decrypt(process.env["Zendesk_Password"]));
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("*** Saved the connection ***");
        await io.homePage.loadingTime()
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Created the connection successfully ***");
        await io.myAccountPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to export page ***");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.addStep("*** Clicked on create export***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "HTTP");
        await io.homePage.addStep("*** Searched for HTTP application ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
        await io.homePage.addStep("*** Selected HTTP application ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2");
        await io.homePage.addStep("*** Searched for HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2 ***");
        await io.homePage.clickByText('HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2');
        await io.homePage.addStep("*** Selected HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2 ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our export ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Opened the export ***");
        await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.homePage.addStep("*** Clicked on Method field ***");
        await io.homePage.clickByText('GET');
        await io.homePage.addStep("*** Selected GET method ***");
        await io.homePage.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/api/v2/tickets/792.json");
        await io.homePage.addStep("*** Filled the Relative URI ***");
        await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
        await io.homePage.addStep("*** Opened Non-standard API response patterns tab ***");
        await io.assert.expectToBeTrue(await (await page.$(selectors.exportsPagePO.HEADERCHECKBOX)).isVisible(), "New Checkbox is not visible");
        await io.homePage.addStep("*** Checked the visibility of checkbox and it is visible ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to connection page ***");
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "HTTP CONNECTION WITH DO NOT OVERRIDE AS SUCCESS MEDIA TYPE AND JSON AS MEDIA TYPE2");
        await io.homePage.loadingTime()
        const preDeleted = await page.$(selectors.integrationPagePO.OPENACTIONSMENU)
        if (preDeleted) {
            await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.click(selectors.connectionsPagePO.DELETE_CONNECTION);
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.click(selectors.basePagePO.DELETE);
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
            await io.homePage.loadingTime()
            await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.homePage.loadingTime()
            await io.homePage.loadingTime()
            await io.homePage.addStep("*** Deleted the existing connection ***");
        }
        else {
            await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
            await io.homePage.addStep("*** Navigated back to home page ***");
        }
    });
});