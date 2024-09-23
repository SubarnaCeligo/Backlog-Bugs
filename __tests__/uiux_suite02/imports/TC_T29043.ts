import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S T29043-Verify that placeholder for Blob key path is sentence cased.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Priority-P4 @Env-All @Zephyr-IO-T29043 Verify that placeholder for Blob key path is sentence cased.", async ({ io, page }) => {
    
        //Go to flow builder page
        await io.homePage.goToMenu("Tools", "Flow builder");

        //Add destination/lookup data-test="Add destination / lookup"
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        //Search and select HTTP
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "HTTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        //Select trasfer files
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.TRANSFER_FILES);
        await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

        //Open advanced section 
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.BLOB_KEY_PATH);
        await io.assert.verifyElementAttribute(selectors.importPagePO.BLOB_KEY_PATH, 'placeholder', 'Blob key path');

    });
});