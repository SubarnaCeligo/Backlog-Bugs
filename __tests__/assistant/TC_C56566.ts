import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C56565 from '../../testData/Flows/TC_C56565.json'


test.describe("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", () => {
    test.only("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", async ({io, page}) => {
        await io.fillFormUI(C56565,"FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
        await page.getByRole('menuitem', { name: 'Content labels', exact: true }).click();
        await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
        await page.getByRole('menuitem', { name: 'Get labels for content', exact: true }).click();
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
        await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
        await page.locator(selectors.basePagePO.MENU_ITEM).nth(0).click();
        await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_VALUE_0);
        const dropdownOptions = await page.getByRole('menuitem').all();
        expect(dropdownOptions.length).toBeGreaterThanOrEqual(1);
    });
  });