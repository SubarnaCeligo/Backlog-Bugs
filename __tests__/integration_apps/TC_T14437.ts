import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T14437 C55423 Verify Mock output is editable by both IO and IA users for exports", () => {
  test("@Zephyr-IO-T14437 @Env-All C55423 Verify Mock output is editable by both IO and IA users for exports ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Mapper2.0 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Mapper1 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace')
    await io.flowBuilder.fill(selectors.exportsPagePO.MOCKOUTPUT_INPUTFIELD, JSON.stringify(
      {
        "page_of_records": [
          {
            "record": {
              "cid": "1429",
              "iid": "730",
              "iqty": "1",
              "iprice": "110",
              "iamt": "100",
              "Memo": "123"
            }
          }
        ]
      }
    ));
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.goToMenu("Resources", "Exports");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "export"
    );
    await io.flowBuilder.loadingTime();
    await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE,0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});
