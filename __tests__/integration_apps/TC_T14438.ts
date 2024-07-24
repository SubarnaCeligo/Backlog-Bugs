import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(" @Zephyr-IO-T14438 C55424 Verify Mock output is editable by both IO and IA users for lookup ", () => {
  test("@Zephyr-IO-T14438 @Env-All C55424 Verify Mock output is editable by both IO and IA users for lookup ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("C55424_DND_IA",0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("New flow");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.goToMenu("Resources", "Exports");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "http lookup C55424"
    );
    await io.flowBuilder.loadingTime();
    await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE,0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
