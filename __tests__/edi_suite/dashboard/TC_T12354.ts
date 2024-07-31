import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T12354_edi from "@testData/Exports/T12354_edi.json";
import T12354_sampleData from "@testData/Exports/T12354_sample.json";
import T12354_output from "@testData/Exports/T12354_output.json";

test.describe("T12354 Test to validate auto preview on File parser window", () => {
    test("@Env-All @Zephyr-IO-T11796 @Priority-P2 T12354 Test to validate auto preview on File parser window", async ({io, page}) => {
        const edi_response = await io.api.postCall('/v1/ediProfiles', T12354_edi);

        await io.exportsPage.addStep('*** Navigating to Exports Page ***');
        await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL)

        await io.exportsPage.addStep('*** Creating a new FTP Export ***');
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "FTP");
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.exportsPage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.exportsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex("FTP CONNECTION", 0);
        await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
        await io.exportsPage.fill(selectors.importPagePO.NAME, 'T12354 FTP Export');
        await io.exportsPage.loadingTime();

        await io.exportsPage.addStep('*** Selecting EDI File Type ***');
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

        await io.exportsPage.addStep('*** Selecting EDI Profile ***');
        await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
        await io.exportsPage.clickByTextByIndex(edi_response.name, 0);

        await io.exportsPage.addStep('*** Selecting Parsing Definition ***');
        if (await page.url().includes("https://staging.")) {
            await io.exportsPage.fill(`${selectors.homePagePO.EDI_FORMAT} input`, 'Generic-005040-850-Purchase order');
        } else {
            await io.exportsPage.fill(`${selectors.homePagePO.EDI_FORMAT} input`, 'Generic-004020-810-Purchase order');
        }
        await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
        await io.exportsPage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
        await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 0);

        await io.exportsPage.addStep('*** Saving the Export ***');
        await io.exportsPage.fill(selectors.flowBuilderPagePO.DIRECTORYPATH, '/io.auto.qa/FTP_UI_AUTOMATION/EXPORTS');
        await io.exportsPage.loadingTime();
        await io.exportsPage.clickByText('Save');

        await io.exportsPage.addStep('*** Adding sample data ***');
        const exportId = page.url().match(/exports\/([^\/?]+)\?/)[1];
        const export_doc = await io.api.getCall('/v1/exports/' + exportId);
        if (await page.url().includes("https://staging.")) {
            export_doc.sampleData = T12354_sampleData.sampleData_Staging;
        } else {
            export_doc.sampleData = T12354_sampleData.sampleData_IAQA;
        }
        await io.api.putCall('/v1/exports/' + exportId, export_doc);
        await io.exportsPage.reloadPage();
        for (let i = 0; i < 5; i++) {
            await io.exportsPage.loadingTime();
        }

        await io.exportsPage.addStep('*** Clicking on EDI Parser helper ***');
        await io.exportsPage.clickByText('Launch');
        await io.exportsPage.loadingTime();
        await io.exportsPage.loadingTime();

        const editorContent = JSON.parse(
            await page.locator(selectors.mappings.MAPPER2DOT0PO.RESULT).evaluate(e => {
              // @ts-ignore
              const editor = ace.edit(e);
              return editor.getValue();
            })
        );

        await io.exportsPage.addStep('*** Verifying the preview results ***');
        if (await page.url().includes("https://staging.")) {
            expect(editorContent).toEqual(T12354_output.staging);
        } else {
            expect(editorContent).toEqual(T12354_output.IAQA);
        }

        await io.exportsPage.addStep('*** Deleting the resources ***');
        await io.api.deleteCall('/v1/exports/' + exportId);
        await io.api.deleteCall('/v1/ediProfiles' + edi_response._id);
    });
});