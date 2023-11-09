import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93699 Validate that user is not able to see " postResponseMap" function in “Insert function stub” field while creating a script (Tile Level)', () => {
  test('C93699 Validate that user is not able to see " postResponseMap" function in “Insert function stub” field while creating a script (Tile Level)', async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
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