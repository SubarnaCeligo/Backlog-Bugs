import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C110728 from '../../testData/inputData/FlowDebugger/C110728.json';

test.describe("C110728_C110729_C110730_C110732", () => {
    test("@Env-All @Zephyr-IO-T14149 @Zephyr-IO-T14150 @Zephyr-IO-T14151 @Zephyr-IO-T14153 C110728_C110729_C110730_C110732", async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C110728, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.homePage.addStep('clicking on import');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        //TC_C110728 Verify canonical stub showing as expected for Blob import
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.homePage.delay(1000)
        const stub = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB)).toString();
        await io.assert.expectToContainValue('{  "page_of_records": [    {      "record": {        "blobKey": "Replace me"      }    }  ]}', stub, "Stub is not showing properly");
        //TC_C110729 Verify user should be able to edit a stub
        await io.homePage.isPageLoaded()
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.homePage.addStep('clicking on import');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);

        //TC_C110730 Clicking â€œPopulate with canonical stubâ€? loads stub and auto-places it into the â€œMock outputâ€? field, replacing existing stub in the mock output field
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.homePage.isPageLoaded()
        await io.homePage.delay(1000)
        const stub1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB)).toString();
        await io.assert.expectToContainValue('{  "page_of_records": [    {      "record": {        "blobKey": "Replace me"      }    }  ]}', stub1, "Stub is not showing properly");

        // //Group rows
        //TC_C110732 Verify if we have group record field configured then stub is showing in page of rows format
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
        await io.flowBuilder.enterHugeData(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT, "id");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUPBYID);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.homePage.isPageLoaded()
        const stub2 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.MOCK_OUTPUT_STUB)).toString();
        await io.assert.expectToContainValue('{  "page_of_records": [    {      "rows": [        {          "blobKey": "Replace me"        }      ]    }  ]}', stub2, "Stub is not showing properly");
    });
});