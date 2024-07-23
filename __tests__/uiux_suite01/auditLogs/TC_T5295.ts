import {  test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C35067 from '@testData/Flows/C35067.json';

test.describe("T5295 Verify downdload button UI in audit log should open the filter dialog", () => {
    test("@Env-All @Zephyr-IO-T5295 Verify downdload button UI in audit log should open the filter dialog", async ({ io, page }) => {
        await io.createResourceFromAPI(C35067, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
        await io.assert.verifyElementIsDisplayed('button:has-text("Download")', 'Download button not displayed in audit logs')
        await page.getByRole('button', { name: 'Download' }).click();
        await io.assert.verifyElementIsDisplayed('p:has-text("Last hour")', 'Download button did not open the filter modal')

    });
});