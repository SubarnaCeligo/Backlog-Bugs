
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C44457 from "@testData/Mapper2.0/TC_C44457.json";
import { allure } from "allure-playwright";
test.describe(" TC_C44457 ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T2364 TC_C44457", async ({io,page}, testInfo) => {
    let flowID = await io.createResourceFromAPI(TC_C44457, 'FLOWS');
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

    await io.homePage.click(
      selectors.basePagePO.EXPAND_ALL
    );
    test.step("*** Clicked on expand button ***", async ()=>{});

    const deleteButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS);
    const addButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
    for (let i = deleteButtons.length-1; i >= 0; i--) {
      await addButtons[i].hover();
      await deleteButtons[i].hover();
      await deleteButtons[i].click();
    }
    test.step("*** Delete each row ***", async () => {});

    var deleteconfirm = await page.locator(selectors.basePagePO.DELETE_BUTTON);
    await deleteconfirm.click();
    test.step("*** Clicked on delete button ***", async ()=>{});
    var dest0 = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input"
    );
    var getdestField = await dest0.textContent();
    await test.step("*** Get the text from the destination field ***", async () => {});

    var src0 = await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input");
    var getsrcField = await src0.textContent();
    test.step("*** Get the text from the source field ***", async ()=>{});
    await io.assert.expectToBeValue(String(getdestField), "", "");
    await io.assert.expectToBeValue(String(getsrcField), "", "");
  });
});
