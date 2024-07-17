import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T24276_T27516 - Verify data is pre-filling on the next page if we select the tile from 'Your existing flow steps'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        //make sure the account has at least one HTTP export
        // await io.createResourceFromAPI(exportJson, 'EXPORT');
    });
    test("@Epic-IO-54539 @Priority-P2 @Env-All TC_T24276_T27516 - Verify data is pre-filling on the next page if we select the tile from 'Your existing flow steps'", async ({ io, page }) => {
        //Navigate to flow builder page
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "HTTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        //Wait for existing resources to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.flowBuilder.click(selectors.basePagePO.SAVE);

        //Verify if data is pre-populated - Checking manadory field values are not empty
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NAME);
        await io.assert.verifyElementHasAttribute(selectors.importPagePO.NAME, 'value');
        await io.assert.verifyElementHasAttribute(selectors.importPagePO.HTTP_RELATIVE_URI, 'value');
        let prePopulatedText = (await io.flowBuilder.getText(selectors.exportsPagePO.HTTP_METHOD)).toString();
        await io.assert.expectNotToBeValue(prePopulatedText, "Please select", "Values are not pre-populated");

        prePopulatedText = (await io.flowBuilder.getText(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN)).toString();
        await io.assert.expectNotToBeValue(prePopulatedText, "Please select", "Export type is not pre-populated");

        await io.flowBuilder.addStep("Bug#IO-T27516 - Verify Export type field is not showing empty");
        await io.assert.expectNotToBeNull(prePopulatedText, "Export type is empty");


    });
});