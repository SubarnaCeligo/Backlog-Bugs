import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(' C51612 Verify the name field under imports', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test(' Verify the name field under imports', async({io,page}) => {
  
        await io.homePage.click("[data-test='Resources']");
        await io.connectionPage.clickByText('Imports')
        await io.importsPage.clickByText('Create import')
        await io.importsPage.click("[data-test='JazzHR']")
        await io.importsPage.click('#connections-dropdown')
        await io.importsPage.clickByText('JAZZHR CONNECTION')
        await io.importsPage.fill("input[name='/name']", "jazz")
        await io.importsPage.clickByText("Next");
  
        await page.waitForTimeout(2000)
  
        io.assert.verifyElementContainsText("label[for=\"name\"]", "Name your import");    
    });
  });