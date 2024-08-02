import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify Auto-scroll to show form errors', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    });
  
    test('@Env-All @Zephyr-IO-T2266 Verify Auto-scroll to show form errors', async({io,page}) => {
        await io.homePage.loadingTime()
        await io.homePage.clickByText('Create import')
        await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP")
        await io.importsPage.click(selectors.importPagePO.FTP_IMPORT)
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN)
        await io.homePage.selectConnectionDropDown(page, "FTP CONNECTION")
        await io.importsPage.clickByText("Next")
        await io.importsPage.waitForElementAttached( selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)
        const errorMessage = await page.$eval(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, element => element.textContent);
        expect(errorMessage.trim()).toBe("A value must be provided");

    });
  })

