
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import mapper from "@testData/Mapper2.0/TC_C46929_Verify_AutoPopulateFileds_Disabled_For_No_SampleData.json";
import { allure } from "allure-playwright";

test.describe("TC_C46929_Verify_AutoPopulateFileds_Disabled_For_No_SampleData", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T18038 TC_C46929_Verify_AutoPopulateFileds_Disabled_For_No_SampleData", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(mapper, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Navigatting to import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on more actions ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      2
    );

    await test.step("*** Validating auto populating fields is disabled for no sample data***", async ()=>{});
    const autoButton = await page.locator(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);
    const isDisabled = await autoButton.isDisabled();
    await io.assert.expectToBeTrue(isDisabled, "");
  });
});
