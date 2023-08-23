import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C56565 from '../../testData/Flows/TC_C56565.json'


test.describe("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", () => {
    test.only("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", async ({io, page}) => {
        await io.fillFormUI(C56565,"FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click('[data-test="assistantMetadata.resource"]');
        await page.getByRole('menuitem', { name: 'Content labels', exact: true }).click();
        await io.flowBuilder.click('[data-test="assistantMetadata.operation"]');
        await page.getByRole('menuitem', { name: 'Get labels for content', exact: true }).click();
        await io.flowBuilder.waitForElementAttached('#name-0');
        await io.flowBuilder.click('#name-0');
        await page.locator('[role="menuitem"]').nth(0).click();
        await io.flowBuilder.click('#value-0');
        const dropdownOptions = await page.getByRole('menuitem').all();
        expect(dropdownOptions.length).toBeGreaterThanOrEqual(1);
    });
  });