import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(' C51613 Verify the name field under exports', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test(' Verify the name field under exports', async({io,page}) => {
  
        await io.homePage.click("[data-test='Resources']");
        await io.connectionPage.clickByText('Exports')
        await io.importsPage.clickByText('Create export')
        await io.importsPage.click("[data-test='JazzHR']")
        await io.importsPage.click('#connections-dropdown')
        await io.importsPage.clickByText('JAZZHR CONNECTION')
        await io.importsPage.fill("input[name='/name']", "jazz")
        await io.importsPage.clickByText("Next");
  
  
        io.assert.verifyElementContainsText("label[for=\"name\"]", "Name your export");    
    });
  });