import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28127", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2197 @Env-All  TC_C28127", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.isPageLoaded();

    var loc = await page.$$(selectors.basePagePO.CONNECTORS_LIST);
    var flag = false;
    looping: for(var i = 0; i < loc.length; i++) {
      if((await loc[i].textContent()) == "Target") {
        flag = true;
        break looping;
      }
    }
    await io.assert.expectToBeFalse(flag,"")

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
