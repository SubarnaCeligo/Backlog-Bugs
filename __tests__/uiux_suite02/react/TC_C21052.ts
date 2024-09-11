import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C21052 from '@testData/Flows/TC_C21052.json';

test.describe("C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", () => {
  test("@Env-All @Zephyr-IO-T2981 C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", async ({io, page}) => {
      await io.createResourceFromAPI(C21052, "FLOWS");
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.loadingTime();
      await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, '21052');
      await io.homePage.loadingTime();
      await io.flowBuilder.waitForElementAttached(':has-text("TC_C21052")');
      await page.getByLabel("Add mapping").nth(0).click();
      await io.homePage.loadingTime();
      await io.flowBuilder.waitForElementAttached('text="SQL query builder"');
      await io.assert.verifyElementDisplayedByText("SQL query builder", "SQL query builder drawer not displayed");
  });
});
