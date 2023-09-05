import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";



test.describe.only(' C51790 Verify "Cant Find" Link under connection form when toggle is under simple', () => {
  test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test('Verify "Cant Find" Link under connection form when toggle is under simple', async({io,page}) => {

      await io.homePage.click(selectors.basePagePO.RESOURCES);
      await io.connectionPage.clickByText('Connections')
      await io.connectionPage.clickByText('Create connection')

      await io.connectionPage.click("[data-test='Loop Returns']")

      const linkSelector = 'a:has-text("can\'t find")';
      const linkFound = await page.waitForSelector(linkSelector, { state: 'attached' });
    
      expect(linkFound).toBeTruthy();
     
  });
})