import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28390 Verify breadcrumbs navigation for Account dashboard", () => {
    test("C28390 Verify breadcrumbs navigation for Account dashboard", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu('dashboard');
        await io.homePage.waitForElementAttached(selectors.basePagePO.BREADCRUMB);
        const breadcrumbList = await page.locator(selectors.basePagePO.BREADCRUMB_LIST).all();
        expect(breadcrumbList.length).toBe(3);
        expect(breadcrumbList[0].innerText()).toBe('Home');
        expect(breadcrumbList[2].innerText()).toBe('Dashboard');
    });
  });