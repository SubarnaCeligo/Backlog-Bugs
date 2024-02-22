import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C27107  Run report drawer - ‘Child integrations’ multi-select field should support an option to select ‘All’ at the top, and then all the other values in the multi-select field should be alpha sorted in ascending order.`, () => {
  test(`C27107  Run report drawer - ‘Child integrations’ multi-select field should support an option to select ‘All’ at the top, and then all the other values in the multi-select field should be alpha sorted in ascending order.`, async ({
    page,
    io
  }) => {
     
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "reports/eventreports"
    );
     
    await io.homePage.clickByText("Run report");
    await io.flowBuilder.click(selectors.basePagePO.CHOOSEINTEGRATIONFORREPORT);
    await io.flowBuilder.waitForElementAttached('text="Payout to Reconciliation"');
    await io.flowBuilder.click('text="Payout to Reconciliation"');
    await io.flowBuilder.click(selectors.basePagePO.CHOOSECHILDINTEGRATIONFORREPORT);
    const selectAll = await io.flowBuilder.isVisible('text="Select All"');
    await io.assert.expectToBeValue(selectAll.toString(), "true", "Select All is not present in the dropdown");

    const listItemSelector = '.MuiList-root.MuiMenu-list li';
    const listItems = await page.$$(listItemSelector);
    const textContents = [];
    for (let i = 1; i < listItems.length; i++) {
      const textContent = await listItems[i].textContent();
      textContents.push(textContent.trim());
    }
    // Check if the text contents are in alphabetical order
    const sortedTextContents = textContents.sort();
    expect(textContents).toEqual(sortedTextContents);
  });
});
