import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all.json";

test.describe('C93707 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Tile level access)', () => {
   
    test.beforeEach(async ({ io }) => {
        const res = await io.api.putCall(
            `v1/ashares/${process.env.IO_Ashare_ID}`,
            testData
          );
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env=all C93707 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Tile level access)', async ({
      io,
      page
    }) => {
     const isResourceVisible = await io.homePage.isVisible(selectors.basePagePO.RESOURCES);
        if(isResourceVisible){
            await io.homePage.hover(selectors.basePagePO.RESOURCES);
            const isScriptsVisible = await io.homePage.isVisible(selectors.basePagePO.SCRIPTS);
            await io.assert.expectToBeValue('false', isScriptsVisible.toString(), 'Scripts page is visible');
        }else{
            await io.assert.expectToBeValue('false', isResourceVisible.toString(), 'Resource page is visible');
        }
    });
  });