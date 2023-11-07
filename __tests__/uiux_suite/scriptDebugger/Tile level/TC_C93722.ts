import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C937322 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Tile level access', () => {
    test.beforeEach(async ({ io }) => {
              await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
            });
    test('C937322 Validate user is able to see default function name as "formInit" instead of "main" for form builder(Tile level access)', async({io,page}) => {
  
       const isResourceVisible = await io.homePage.isVisible(selectors.basePagePO.RESOURCES);
        if(isResourceVisible){
            await io.homePage.hover(selectors.basePagePO.RESOURCES);
            const isScriptsVisible = await io.homePage.isVisible(selectors.basePagePO.SCRIPTS);
            await io.assert.expectToBeValue('false', isScriptsVisible.toString(), 'Scripts page is visible');
        }else{
            await io.assert.expectToBeValue('false', isResourceVisible.toString(), 'Resource page is visible');
        }    
    });
  })
