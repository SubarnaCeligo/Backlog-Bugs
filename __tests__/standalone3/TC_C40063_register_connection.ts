import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40063_register_connection_lastUpdate", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.integrationURL);
    
  });

  test("@Zephyr-IO-T4719 @Env-All TC_C40063_register_connection_lastUpdate", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    
    test.step("*** clicking on the connection tab ***", async ()=>{});
    await io.homePage.click("//button[contains(text(),'Register connections')]");
    test.step("*** clicking on the register connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.NAME_HEADER);
    await io.homePage.click(selectors.connectionsPagePO.NAME_HEADER);
    await io.homePage.loadingTime();

    let afterSorting = (await io.integrationPage.getText(selectors.connectionsPagePO.NAME_COLUMN_LIST)).toString();
    let docNoArray: string[] = afterSorting.split(',');

    function isSortedInAscendingOrder(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].localeCompare(arr[i + 1], undefined, { sensitivity: 'base' }) > 0) {
          return false;
        }
      }
      return true;
    }

    await io.assert.expectToBeTrue(isSortedInAscendingOrder(docNoArray), 'The name column is not sorted in ascending order');
  });
});
