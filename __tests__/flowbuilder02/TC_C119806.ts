import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119806 from '../../testData/inputData/FlowBuilder/C119806.json';

test.describe("TC_C119806", () => {
    let id;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24236 @Env-All Verify user is able to add 'useAsPrimaryInterface' value under custom form displayed underCustom Settings of Flow", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119806, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "TC_C119806"
        // );
        // //Open the flow
        // await io.flowBuilder.clickByText("TC_C119806");

        //Clicking on flow setting
        await io.flowBuilder.click(selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CUSTOM);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119806.CustomJson));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119806_EXPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.flowBuilder.click(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119806_LOOKUP-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //IMPORT
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119806_IMPORT-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});