
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C31555", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C31555", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Templates");
    await test.step("Clicked templates button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.CREATETEMPLATE);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");

    var toBePresentApps = ["http", "AS2", "DynamoDB", "Wrapper", "Oracle DB"];
    for(var j in toBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      ).fill(toBePresentApps[j]);
      
      await io.homePage.clearTextValue((`${selectors.integrationPagePO.CREATEIA_APPLICATIONS} input`));
      await page.keyboard.press('Enter');

    }

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    var matcher = await io.homePage.getTextFromElement(selectors.basePagePO.TEMPLATESLIST, "Don't use");
    await io.assert.expectToBeTrue(matcher, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
