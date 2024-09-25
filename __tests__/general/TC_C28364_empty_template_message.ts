import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28364", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2197 @Env-All TC_C28364", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.isPageLoaded();

    var loc = await page.$$(selectors.basePagePO.CONNECTORS_LIST);
    looping: for(var i = 0; i < loc.length; i++) {
      if((await loc[i].textContent()) == "Google BigQuery") {
        loc[i].click();
        await io.homePage.isPageLoaded();
        break looping;
      }
    }

    await io.homePage.loadingTime();
    var txt = await io.homePage.getText(selectors.integrationPagePO.NOREVISIONMSG)
    await io.assert.expectToContainValue( "Popular Integration Apps and Templates",String(txt), "");
  });
});
