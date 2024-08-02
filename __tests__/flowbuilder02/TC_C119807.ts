import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119807 from '../../testData/inputData/FlowBuilder/C119807.json';
import TC from '../../testData/inputData/FlowBuilder/IO-T27039.json';

test.describe("TC_C119807_IO-T27037_IO-T27038_IO-T27039", () => {
    let id; let id1; let id2;
    test.describe.configure({ retries: 1 })
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteFlowViaAPI(id1);
        await io.api.deleteFlowViaAPI(id2);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T24237 @Env-All", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C119807, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "TC_C119807"
        // );
        // //Open the flow
        // await io.flowBuilder.clickByText("TC_C119807");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119807.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119807_EXPORT-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119807.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119807_LOOKUP-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        // IMPORT
        await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(C119807.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C119807_IMPORT-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test("@Epic-IO-63762  @Priority-P2  @Zephyr-T27037 @Zephyr-T27038 @Env-All", async ({ io, page }) => {
        id1 = await io.createResourceFromAPI(C119807.newFlow, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "TC_T27037"
        // );
        // //Open the flow
        // await io.flowBuilder.clickByText("TC_T27037");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        //IO-T27038
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27038 export-chromium-linux.png");
        //clicking on launch from builder
        //IO-T27037
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify("dd"));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27037 export-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        //IO-T27038
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.myAccountPage.delay(5000);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27038 LOOKUP-chromium-linux.png");
        //clicking on launch from builder
        //IO-T27037
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify("dd"));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.myAccountPage.delay(5000);
        expect(await page.screenshot()).toMatchSnapshot("IO-T27037 LOOKUP-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        // IMPORT
        await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        //IO-T27038
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("IO-T27038 import-chromium-linux.png");
        //clicking on launch from builder
        //IO-T27037
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify("dd"));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        const Symbosl = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbosl.screenshot()).toMatchSnapshot("IO-T27037 import-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test("IO-T27039 @Epic-IO-63762  @Priority-P2  @Zephyr-T27039 @Env-All", async ({ io, page }) => {
        id2 = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        // await io.flowBuilder.reloadPage();
        // await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        // await io.integrationPage.waitForElementAttached(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
        // );
        // await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        // await io.integrationPage.fill(
        //     selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
        //     "IO-T27039"
        // );
        // //Open the flow
        // await io.flowBuilder.clickByText("IO-T27039");
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27039 export-chromium-linux.png");
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting1));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27039_1 export-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Lookup
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.myAccountPage.delay(5000);
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("IO-T27039 LOOKUP-chromium-linux.png");
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting1));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.myAccountPage.delay(5000);
        expect(await page.screenshot()).toMatchSnapshot("IO-T27039_1 LOOKUP-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        // IMPORT
        await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATATEST);
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.GENERAL);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("IO-T27039 import-chromium-linux.png");
        //clicking on launch from builder
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.SCRIPT_DATA_CONTENT, JSON.stringify(TC.customSetting1));
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.homePage.loadingTime();
        const Symbosl = await page.$(selectors.flowBuilderPagePO.RIGHT_DRAWER);
        expect(await Symbosl.screenshot()).toMatchSnapshot("IO-T27039_1 import-chromium-linux.png");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    });
});