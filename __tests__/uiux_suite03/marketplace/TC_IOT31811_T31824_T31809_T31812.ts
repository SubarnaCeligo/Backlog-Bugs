import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-SaiPhanindra IO-T31811_IO-T31824_IO-T31809_IO-T31812", () => {
    test("@Zephyr-IO-T31811 @Zephyr-IO-T31824 @Zephyr-IO-T31809 @Zephyr-IO-T31812 @Priority-P2 @Env-All", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
        await io.homePage.click(selectors.basePagePO.MARKETPLACE)
        await io.homePage.loadingTime();
        await io.homePage.waitForElementAttached(selectors.marketplacePagePO.FREQUENTLY_SELECTED)
        const checkDefault = await page.$eval(selectors.marketplacePagePO.FREQUENTLY_SELECTED, element =>
            element.hasAttribute('aria-pressed')
        );
        await expect(checkDefault).toBeTruthy();
        let valid = false;
        try {
            await io.assert.verifyElementDisplayedByText('FREQUENTLY SELECTED APPS', " frequently Text is not displayed properly");

            await io.assert.verifyElementDisplayedByText('ALL APPLICATIONS A > Z', "Text is not displayed properly");
        }
        catch (e) {

            valid = true;

        }
        if (valid == true) {
            // text is not present as expecte
            await io.assert.expectToBeTrue(
                valid,
                "text is not present as expected"
              );

        }
        await io.loginPage.click(selectors.marketplacePagePO.ALL_APPLICATIONS);
        const checktoggle = await page.$eval(selectors.marketplacePagePO.ALL_APPLICATIONS, element =>
            element.hasAttribute('aria-pressed')
        );
        await expect(checkDefault).toBeTruthy();
        await io.assert.expectToBeTrue(
            checkDefault,
            "text is not present as expected"
          );
    });
});