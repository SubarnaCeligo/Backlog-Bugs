import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93705 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Monitor)', () => {
   
    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('C93704 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Monitor)', async ({
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
