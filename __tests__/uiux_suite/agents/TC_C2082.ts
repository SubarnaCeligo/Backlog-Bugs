import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2082 Verify if able to view all the installers for the last Agent in the list page.", () => {
  test("C2082 Verify if able to view all the installers for the last Agent in the list page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached("[data-test='Marketplace']");
      await io.homePage.goToMenu("Resources", "Agents");

      for(let i=0; i<15; i++){
        await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 0);
        await io.homePage.fill(selectors.importPagePO.NAME, `${i+1}_agent_`);
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      }
      await io.homePage.waitForElementAttached('tbody tr');
      const agentList = await page.locator('tbody tr').all();

      for(let i=0; i<agentList.length; i++) {
        await agentList[i].locator(selectors.homePagePO.DOWNLOAD_AGENT_INSTALLER).click();
        await io.homePage.waitForElementAttached("text='Windows'");
        const isWindowsVisible = await io.homePage.isVisible("text='Windows'");
        await io.assert.expectToBeTrue(isWindowsVisible,  "download dropdown option not displayed");
      }

  });
});