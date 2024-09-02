
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import mapper from "@testData/Mapper2.0/TC_C46927_C46924.json";
import { allure } from "allure-playwright";

test.describe("@Env-all @Zephyr-IO-T18036 @Zephyr-IO-T18034 TC_C46927_C46924", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("TC_C46927_C46924", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(mapper, 'FLOWS');

    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON,
      0
    );
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
      2
    );
    await io.homePage.click(
      selectors.importPagePO.AUTO_POPULATE_MAPPINGS
    );
    await io.homePage.click(
      selectors.basePagePO.EXPAND_ALL
    );

    const value = await io.homePage.isVisible(
      selectors.mappings.MAPPER2DOT0PO.REQUIRED_ROW_LABEL
    );
    await io.assert.expectToBeTrue(value, "");

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
      2
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DELETE_ALL_OPTION
    );
    const deleteButton = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS
    );
    const isDisabled = await deleteButton.isDisabled();
    await io.assert.expectToBeTrue(isDisabled, "");

    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      0
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.DISCARD_CHANGES,
      0
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
