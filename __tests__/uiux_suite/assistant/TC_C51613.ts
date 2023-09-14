import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(' C51613 Verify the name field under exports', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test(' Verify the name field under exports', async({io,page}) => {
  
        await io.homePage.goToMenu("Resources", "Exports")
        await io.importsPage.clickByText('Create export')
        await io.importsPage.click( selectors.basePagePO.JAZZHR_SELECTOR)
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN)
        await io.importsPage.clickByText('JAZZHR CONNECTION')
        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "jazz")
        await io.importsPage.clickByText("Next");
  
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.LABEL_NAME_SELECTOR)
        io.assert.verifyElementContainsText(selectors.basePagePO.LABEL_NAME_SELECTOR, "Name your export");    
    });
  });