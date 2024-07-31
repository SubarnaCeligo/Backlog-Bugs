import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T11503 from "../../../testData/inputData/Flows/T11503.json";

test.describe('T11503 Verify Sample data is shown when we apply resource path for FTP/S3 exports', () => {
    let id;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test('"@Zephyr-IO-T11503 @Env-All Verify Sample data is shown when we apply resource path for FTP/S3 exports ', async ({ io, page }) => {
        id = await io.createResourceFromAPI(T11503, "FLOWS");
        await io.homePage.navigateTo(
            process.env["IO_Integration_URL"] + "flowBuilder/" + id
        );
        await io.flowBuilder.loadingTime();
        //wait for flow to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
        await io.exportsPage.loadingTime();
        await io.exportsPage.waitForElementAttached('[data-test="file.json.resourcePath"]');
        await io.flowBuilder.fill('[data-test="file.json.resourcePath"] input', 'tickets[*].tags');
        await io.exportsPage.waitForElementAttached(selectors.importPagePO.CLICKPREVIEW);
        await io.exportsPage.click(selectors.importPagePO.CLICKPREVIEW);
        let previewData = (await io.exportsPage.getText(selectors.basePagePO.ACE_EDITOR_ID)).toString().replace(/\s+/g, ' ').trim();;
     
        expect(previewData.includes('page_of_records": [ { "rows": [ "example", "test" ] }')).toBeTruthy();
        await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.FILENAMEFIELD);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FILENAMEFIELD, 1);

        await io.homePage.waitForText(`${selectors.connectionsPagePO.DATA_PANEL} div`, 'batch_of_records');
        await io.exportsPage.waitForElementAttached(`${selectors.connectionsPagePO.DATA_PANEL} div`);
        let previewData2 = (await io.exportsPage.getText(`${selectors.connectionsPagePO.DATA_PANEL} div`)).toString().replace(/\s+/g, ' ').trim();;
        expect(previewData2.includes('123456789101112131415161718192021222324252627282930313233343536373839404142434445{ "batch_of_records": [ { "rows": [ "example", "test" ] }')).toBeTruthy();




    });
});
