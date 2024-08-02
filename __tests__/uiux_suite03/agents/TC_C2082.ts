import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2082 Verify if able to view all the installers for the last Agent in the list page.", () => {
  test("@Env-All @Zephyr-IO-T18479 C2082 Verify if able to view all the installers for the last Agent in the list page. @Priority-P2 @Zephyr-IO-T18479 @ENV-All", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
      await io.homePage.goToMenu("Resources", "Agents");

      for(let i=0; i<15; i++){
        await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.clickByIndex(selectors.basePagePO.ADD_NEW_RESOURCE, 0);
        await io.homePage.fill(selectors.importPagePO.NAME, `${i+1}_agent_`);
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      }
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COLUMNS);
      const agentList = await page.locator(selectors.flowBuilderPagePO.COLUMNS).all();

      for(let i=0; i<15; i++) {
        await agentList[i].locator(selectors.homePagePO.DOWNLOAD_AGENT_INSTALLER).click();
        await io.homePage.waitForElementAttached("text='Windows'");
        const isWindowsVisible = await io.homePage.isVisible("text='Windows'");
        await io.assert.expectToBeTrue(isWindowsVisible,  "download dropdown option not displayed");
      }
  });
});