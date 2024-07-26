import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" @Zephyr-IO-T14479 C55492 Verify Mock response is editable by both IO and IA users ", () => {
  test("@Zephyr-IO-T14479 @Env-All C55492 Verify Mock response is editable by both IO and IA users ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Salesforce - NetSuite");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Financial");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("NetSuite Customer Financials to Salesforce Account");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT,0);
    await io.homePage.loadingTime();
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.goToMenu("Resources", "Imports");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "import"
    );
    await io.flowBuilder.loadingTime();
    await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE,0);
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
