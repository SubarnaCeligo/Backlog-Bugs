import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C50896 Verify the 'Number of days until MFA is required' input box", () => {
    test("@Env-All @Zephyr-IO-T19644 C50896 Verify the 'Number of days until MFA is required' input box", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);

        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, 'a');
        let errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
        let errorText = await errorElement.innerText();
        expect(errorText).toBe('Value must be numbers only');

        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '!');
        errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
        errorText = await errorElement.innerText();
        expect(errorText).toBe('Value must be numbers only');

        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '1');
        errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
        expect(errorElement).toBe(null);
    });
});
