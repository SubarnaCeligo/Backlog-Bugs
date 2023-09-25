import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93720 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Monitor)', () => {
    test.beforeEach(async ({ io }) => {
              await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
            });
    test('C93720 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Monitor)', async({io,page}) => {
  
     const isResourceVisible = await io.homePage.isVisible(selectors.basePagePO.RESOURCES);
        if(isResourceVisible){
            await page.hover(selectors.basePagePO.RESOURCES);
            const isScriptsVisible = await io.homePage.isVisible('[data-test="Scripts"]');
            await io.assert.expectToBeValue('false', isScriptsVisible.toString(), 'Scripts page is visible');
        }else{
            await io.assert.expectToBeValue('false', isResourceVisible.toString(), 'Resource page is visible');
        }    
    });
  })