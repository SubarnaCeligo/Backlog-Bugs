import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C21052 from '../../../testData/Flows/TC_C21052.json';

test.describe("C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", () => {
  test("C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", async ({io, page}) => {
      await io.fillFormUI(C21052, "FLOWS");
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C21052');
      await page.getByLabel("Add mapping").nth(0).click();
      await io.flowBuilder.waitForElementAttached('text="SQL query builder"');
      expect(page.getByText("SQL query builder")).toBeVisible();
  });
});
