import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2222", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5960 @Env-All  TC_C2222", async ({io,page}, testInfo) => {
    var resp = true
    let response = await io.api.getCall("v1/templates/published")
    for (let i = 0; i < response.length; i++) {
      if (response[i].hasOwnProperty("Email")){
        resp = false
      } 
    }
    await io.assert.expectToBeTrue(resp, "");
      "*** No sensitive information like Email is there ***"

    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.homePage.loadingTime()
    var marketPlaceTitle = (await io.homePage.getText(selectors.flowBuilderPagePO.DASHBOARD1)).toString()
    
    await io.assert.expectToBeValue( "Marketplace", marketPlaceTitle, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
