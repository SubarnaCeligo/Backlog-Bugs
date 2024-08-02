import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119804 from '../../testData/inputData/FlowBuilder/C119804.json';
import TC from '../../testData/inputData/FlowBuilder/C119805.json';

test.describe("TC_C119804", () => {
    let id;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test.afterEach(async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LAUNCH_EDITOR);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24234 @Env-All Verify user is able to add 'useAsPrimaryInterface' value under custom form displayed under Settings of Integration", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119804, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.reloadPage();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.CustomJson));
        // await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSEBUTTON);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LAUNCH_EDITOR);

        //Clicking on flows
        await io.flowBuilder.click(selectors.flowGroupingPagePO.FLOWS);
        await io.integrationPage.waitForElementAttached(
            selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        );
        await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(
            selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
            "TC_C119804"
        );
        //Open the flow
        await io.flowBuilder.clickByText("TC_C119804");
        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        await io.flowBuilder.delay(4000);
        expect(await page.screenshot()).toMatchSnapshot("TC_C119804_EXPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119804_LOOKUP-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //IMPORT
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119804_IMPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});