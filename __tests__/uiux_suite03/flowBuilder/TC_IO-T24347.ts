import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import importData from "@testData/FlowBuilder/IO-T24347.json";
import { allure } from "allure-playwright";
import fs from "fs";

test.describe('Verify user is able to download the files from UI, Verify downloaded file has correct data', () => {
    let id;
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
    });
    test.afterEach(async ({ io }) => {
        id = await io.api.getFlowId("http-Ftp_flow");
        await io.api.deleteFlowViaAPI(id)
    });

    test('@Env-All @Zephyr-IO-T24347 Verify user is able to download the files from UI, Verify downloaded file has correct data', async ({ io, page }) => {

        await io.flowBuilder.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.loadingTime();
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
        await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(
            selectors.basePagePO.INPUT_NAME_SELECTOR,
            "http_export"
        );
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
        await io.flowBuilder.clickByText("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD)
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET)
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/groups.json");
        await io.flowBuilder.click(selectors.exportsPagePO.MUI_COMPONENT_SELECT_TYPE)
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_ALL)
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB)
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.PATH_TO_FILE_URL_PATHS + " input", "$path$PATH");
        await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW)
        await io.flowBuilder.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.COPYBUTTON);


        // Retrieve the text from the clipboard to validate
        const clipboardText = await page.evaluate(async () => {
            return await navigator.clipboard.readText();
        });
        const expectedData = JSON.parse(clipboardText)

        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE)

        await io.flowBuilder.loadingTime()

        await io.pageProcessor(allure, importData)
        await io.flowBuilder.saveandRunFlow("http-Ftp_flow")
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({ state: 'visible', timeout: 3600000 });

        await io.homePage.loadingTime()
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DOWNLOADFILES)
        let filePath = "/downloads/file_downloaded/jsonFile.json"
        await io.homePage.downloadFileAtSpecificLocation(filePath)

        let fileData = await fs.readFileSync(process.cwd() + filePath)
        let actualData = await JSON.parse(fileData.toString())
        let relevantExpectedData = expectedData.page_of_records.map(record => record.record)
        let relevantExpectedPartString = JSON.stringify(relevantExpectedData);

        // Convert the second object to a string for comparison
        let actualDataString = JSON.stringify(actualData);
        await expect(relevantExpectedPartString).toEqual(actualDataString)
    });
});




