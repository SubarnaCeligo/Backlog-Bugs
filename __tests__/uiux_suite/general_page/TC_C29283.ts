import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify Auto-scroll to show form errors', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    });
  
    test('Verify Auto-scroll to show form errors', async({io,page}) => {
        await io.homePage.clickByText('Create import')
        await io.importsPage.click(selectors.importPagePO.FTP_IMPORT)
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN)
        await io.importsPage.clickByText("FTP_PGP_PRIVATE_KEY CONNECTION - Offline")
        await io.importsPage.clickByText("Next")

        await io.importsPage.waitForElementAttached( selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)

// Get the text content of the error message element
const errorMessage = await page.$eval(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, element => element.textContent);

// Assert the expected error message
expect(errorMessage.trim()).toBe("A value must be provided");

    });
  })

