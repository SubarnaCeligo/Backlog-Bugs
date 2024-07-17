import {expect, test} from "@celigo/ui-core-automation";
import testData from "../../testData/inputData/FlowBuilder/T28606.json";
import * as selectors from "@celigo/aut-selectors";


test.describe("@ZephyrIO-T14542 C59677", () => {
    test("@ZephyrIO-T14542 C59677 @Env-All To Verify that the mock output are working as expected", async ({io, page}) => {

        //Create a flow with export imports containing mock output
        let flowId = await io.createResourceFromAPI(testData, 'FLOWS');

        //Open export and verify mock output
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN);
        let mockData = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.MOCKOUT1)).toString();
        await io.assert.expectToContainValue('{  "page_of_records": [    {      "record": {        "ns17:InventoryItemId": "100001193354120",        "ns17:OrganizationId": "300000002130092",        "ns17:FLEX_PARAM_GLOBAL_COUNTRY_CODE": {          "xsi:nil": "true"        },        "ns17:__FLEX_Context": {          "xsi:nil": "true"        }',
        mockData,
        'Mockdata is not retained in export');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

        //Open import and verify mock output
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCKRESPONSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKRESPONSE);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.POPULATE_CANONICAL_STUB);
        mockData = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.MOCKRES1)).toString();
        await io.assert.expectToContainValue('{    "id": "1234567890",    "errors": [],    "_json": {      "id": "1234567890",      "mockResponse": "Replace mockResponse key and value with destination data.',
        mockData,
        'Mockdata is not retained in import');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.loadingTime()
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 300000});
        const error = await page.$("text='error'");
        expect(error).toBe(null);

    });
  });