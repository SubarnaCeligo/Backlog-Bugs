
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28364", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C28364", async ({io,page}, testInfo) => {
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

    var txt = await io.homePage.getText(selectors.integrationPagePO.NOREVISIONMSG)
    await io.assert.expectToBeValue(String(txt), "Prebuilt templates and integration apps are not yet available for this application. Anyone with manager permission and above can use Flow Builder to create new custom flows using the prebuilt connector available for this application.Need help? Check out our documentation or join our community.", "");
  });
});
