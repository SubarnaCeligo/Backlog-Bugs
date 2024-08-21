import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowDebugger/C104576.json';

test.describe("C104576 Verify error messages when Mock output is populated with empty canonical json", () => {
    test("@Env-All @Zephyr-IO-T24649 C104576 Verify error messages when Mock output is populated with empty canonical json", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONDROP0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.isPageLoaded()
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB)
        await io.myAccountPage.delay(1000);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD + " .ace_content", JSON.stringify(TC.Text));
        await io.flowBuilder.isPageLoaded()
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        const errorMsg = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToContainValue('All mock data records must contain at least one key-value pair.', errorMsg, "Error is not showing properly");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
        await io.myAccountPage.delay(1000);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD + " .ace_content", JSON.stringify(TC.Text1));
        await io.flowBuilder.isPageLoaded()
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        const errorMsg1 = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToContainValue('Mock output must be in integrator.io canonical format.', errorMsg1, "Error is not showing properly");
    });
});