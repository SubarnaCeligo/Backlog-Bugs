import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C31555", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5967 @Env-All  TC_C31555", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Templates");
    await test.step("Clicked templates button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.CREATETEMPLATE);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");

    var toBePresentApps = ["http", "AS2", "DynamoDB", "Wrapper", "Oracle DB"];
    for(var j in toBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input[type='text']")
      ).fill(toBePresentApps[j]);
      
      await io.homePage.clearTextValue((`${selectors.integrationPagePO.CREATEIA_APPLICATIONS} input`));
      await page.keyboard.press('Enter');

    }

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    if (await io.homePage.isVisible('text="A document already exists. Please contact celigo support for further assistance."'))
    {
      await io.homePage.click(selectors.basePagePO.CLOSE);
      await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES)
    }

    var matcher = await io.homePage.getTextFromElement('td>div>div', "Don't use");
    await io.assert.expectToBeTrue(matcher, "");

    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Don't use");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
});
