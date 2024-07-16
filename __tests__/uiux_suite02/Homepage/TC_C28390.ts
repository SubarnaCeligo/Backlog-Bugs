import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28390 Verify breadcrumbs navigation for Account dashboard", () => {
    test("@Env-All @Zephyr-IO-T888 C28390 Verify breadcrumbs navigation for Account dashboard", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu('account-dashboard');
        await io.homePage.waitForElementAttached(selectors.basePagePO.BREADCRUMB);
        const breadcrumbList = await page.locator(selectors.basePagePO.BREADCRUMB_LIST).all();
        await io.homePage.addStep('Checking the breadcrumb texts and length');
        await io.assert.expectToBeValue('3', (breadcrumbList.length).toString(), 'Breadcrumb length not as expected');
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},1)`, 'Home');
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},3)`, 'Dashboard');
    });
  });