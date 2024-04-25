import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-QA @Zephyr-IO-T9313 C28851_Push to APIM for IO listner, MyAPis, Export, Import, Existing API Manager and Push to apim option is not available for custom Webhooks", () => {
    test("@Env-QA MyAPis", async ({ io, page, context }) => {
        const randomString = "MyAPIS" + (Math.random() + 1).toString(36).substring(7);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.MYAPI);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, randomString);
        await io.flowBuilder.click(selectors.mappings.SELECTSCRIPTFORHOOKS);
        await io.homePage.loadingTime();
        const value = await page.$$(selectors.importPagePO.NAME);
        await value[1].fill(randomString);
        await io.homePage.loadingTime();
        const script = "function preSavePage (options) {return {data: options.data,errors: options.errors,abort: false,newErrorsAndRetryData: []}}";
        (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).fill(script);
        const snc = await page.$$(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await snc[1].click();
        await io.homePage.loadingTime();
        (await page.$(selectors.flowBuilderPagePO.APIMSCRIPT)).fill(randomString);
        await snc[0].click();
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, randomString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOLOCKEDAPIM);
        await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText('Request access to API management', 'APIM not locked')
    });
    test("@Env-QA Export", async ({ io, context, page }) => {
        const randomString = "Export" + (Math.random() + 1).toString(36).substring(7);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_CONNECTION);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText("SLACK CONNECTION");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, randomString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKBOTS);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKBOTINFO);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, randomString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOLOCKEDAPIM);
        await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText('Request access to API management', 'APIM not locked')
    });
    test("@Env-QA Import", async ({ io, page, context }) => {
        const randomString = "Import" + (Math.random() + 1).toString(36).substring(7);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.IMPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_CONNECTION);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText("SLACK CONNECTION");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, randomString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLS);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLADD);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, randomString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOLOCKEDAPIM);
        await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText('Request access to API management', 'APIM not locked')
    });
}
);
