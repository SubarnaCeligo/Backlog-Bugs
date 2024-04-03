import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all.json";

test.describe('C93703 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Tile level access)', () => {
   
    test.beforeEach(async ({ io }) => {
        const res = await io.api.putCall(
            `v1/ashares/${process.env.IO_Ashare_ID}`,
            testData
          );
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env=all C93703 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Tile level access)', async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.clickByText('C68510_DND');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.assert.verifyElementAttributeContainsText(`${selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL} button`, 'class', 'Mui-disabled');
  
    });
  });