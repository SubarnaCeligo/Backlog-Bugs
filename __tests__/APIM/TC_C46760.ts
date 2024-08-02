import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Push to APIM for IO listner, MyAPis, Export, Import, Existing API Manager and Push to apim option is not available for custom Webhooks", () => {
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING MyAPis", async ({ io, page, context }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.MYAPI);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.mappings.SELECTSCRIPTFORHOOKS);
        await io.homePage.loadingTime();
        const value = await page.$$(selectors.importPagePO.NAME);
        await value[1].fill(uniqueString);
        await io.homePage.loadingTime();
        const script = "function preSavePage (options) {return {data: options.data,errors: options.errors,abort: false,newErrorsAndRetryData: []}}";
        (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).fill(script);
        const snc = await page.$$(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await snc[1].click();
        await io.homePage.loadingTime();
        (await page.$(selectors.flowBuilderPagePO.APIMSCRIPT)).fill(uniqueString);
        await snc[0].click();
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM);
        await io.homePage.loadingTime();
        const name = await io.flowBuilder.getText(selectors.flowBuilderPagePO.APIMRESOURCELABEL);
        await io.assert.expectToBeTrue(name.toString().includes(uniqueString), "name doesn't match");
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.APIMNEW)).isVisible(), "New API is not visible");
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.APIMEXISTING)).isVisible(), "Existing API is not visible");
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.APIMNEW)).isChecked(), "New API is not checked");
        const apimname = await io.flowBuilder.getText(selectors.flowBuilderPagePO.APIMMANAGERLABLE);
        await io.assert.expectToBeTrue(apimname.toString().includes("Fields to be sent to API manager"), "APIM name doesn't match");
        await io.assert.expectToBeFalse(await (await page.$(selectors.flowBuilderPagePO.APIMGATEWAYURL)).isDisabled(), "Gateway URL is not disabled");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.APIMPUSH)).isDisabled(), "Push to APIM is not disabled");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, "name='gatewayContextPath'");
        const errormessage = await io.flowBuilder.getText(selectors.flowBuilderPagePO.APIMCONTECTPATHERRORMESSAGE);
        await io.assert.expectToBeTrue(errormessage.toString().includes("Enter only letter, number, dash or underscore."), "error message doesn't match");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATION);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        const openspecname = await io.flowBuilder.getText(selectors.flowBuilderPagePO.APIMOPENSPECWARNINGTITLE);
        await io.assert.expectToBeTrue(openspecname.toString().includes("OpenAPI Specification (OAS)"), "OpenAPI Specification name doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime()
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
    });
    test("@Zephyr-IO-T9350 @Zephyr-IO-T9350 @Env-QA @Env-STAGING custom webhook", async ({ io, page }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.WEBHOOK);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VERIFICATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NSBASIC);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.CUSTOMWEBHOOKUSERNAME, uniqueString);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.CUSTOMWEBHOOKPASSWORD, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        const PushtoAPIM = await io.flowBuilder.getElementsLength(selectors.flowBuilderPagePO.APIMPUSHOPTION);
        const manageApi = await page.locator(selectors.flowBuilderPagePO.PUSHTOAPIM);
        await expect(manageApi).not.toBeVisible();
        await io.assert.expectToBeValue(PushtoAPIM.toString(), '1', "PUSH to APIM is visible for custom webhook");
        await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
        await io.flowBuilder.click(selectors.basePagePO.DELETE);
        await io.homePage.loadingTime();
    });
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING IOListner", async ({ io, page, context }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Celigo');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.INTEGRATORAPPLICATION);
        await io.flowBuilder.click(selectors.exportsPagePO.WEBHOOK_SELECT);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATION);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime()
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
    });
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING Export", async ({ io, context, page }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'slack');
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_CONNECTION);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText("Slack Connection");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKBOTS);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKBOTINFO);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATION);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime()
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
    });
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING Lookup", async ({ io, context, page }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.TOOLS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'http connection');
        await io.flowBuilder.clickByText("http connection");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATION);
        await io.flowBuilder.click(selectors.importPagePO.HTTPDELETEMETHOD);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime()
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match");

    });
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING Existing API Manager", async ({ io, page, context }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.TOOLS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);;
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'http connection');
        await io.flowBuilder.clickByText("http connection");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMEXISTING);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMREFRESHSELECT);
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.APIMREFRESHSELECT)).isVisible(), "refresh select is not visible");
        const pushtoapim = await page.$(selectors.flowBuilderPagePO.APIMPUSH);
        const pushoapim1 = await pushtoapim.isDisabled();
        await io.assert.expectToBeTrue(pushoapim1, "Push to APIM is not disabled");
        await io.flowBuilder.loadingTime();
        await page.setDefaultTimeout(5000);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMREFRESHSELECT);
        await page.setDefaultTimeout(9000);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match");
    });
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING Import", async ({ io, page, context }) => {
        const uuidv4 = require('uuid').v4;
        const uniqueString = uuidv4()

        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.IMPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'slack');
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_CONNECTION);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText("Slack Connection");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLS);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLADD);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, uniqueString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMCONTEXTPATH, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATION);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMFLOW, uniqueString);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMPUSH);
        await io.flowBuilder.delay(15000);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime()
        await page.waitForTimeout(5000);
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'integrator.io/#!/production/';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
    });
}
);
