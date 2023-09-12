import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28390 Verify breadcrumbs navigation for Account dashboard", () => {
    test("C28390 Verify breadcrumbs navigation for Account dashboard", async ({io, page}) => {
        // await io.homePage.navigateTo('https://qa.staging.integrator.io/dashboard');
        await io.homePage.goToMenu('Dashboard');
        await io.homePage.waitForElementAttached('[aria-label="breadcrumb"]');
        const breadcrumbList = await page.locator('[aria-label="breadcrumb"] li').all();
        await page.pause();
        expect(breadcrumbList.length).toBe(3);
        expect(breadcrumbList[0].innerText()).toBe('Home');
        expect(breadcrumbList[2].innerText()).toBe('Dashboard');
    });
  });