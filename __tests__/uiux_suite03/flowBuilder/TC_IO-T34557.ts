import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify the preview panel appears while creating a file lookup.", () => {
    test("@Bug-IO-84282 @Env-QA @Priority-P2 @Zephyr-IO-T34557", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'S3');
        await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);
        await io.flowBuilder.clickByText("Look up additional files (per record)");
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'S3 LOOKUP');
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.homePage.clickByText("JSON");
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/dataloader/T34557.json");
        await io.homePage.addStep("Uploaded json file");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'S3 CONNECTION');
        await io.flowBuilder.clickByText('S3 CONNECTION');
        //Verify the preview panel appears while creating a file lookup.
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.FETCH_PREVIEW, "Preview pannel is not displayed");
        // verify the preview functionality works while the user creates a file lookup.
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);

        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached('text="Parsed output"');
        let editorContent = JSON.parse(await page.locator(selectors.basePagePO.ACE_EDITOR_ID).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        let editorContentKeys = Object.keys(editorContent);
        let isPageOfRecords = editorContentKeys.includes('page_of_records');
        await io.assert.expectToBeTrue(isPageOfRecords, 'Data did not load properly after preview');
    });
});