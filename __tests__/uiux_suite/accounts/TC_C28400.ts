import { test, expect, links } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C28400 Running flows tab -Verify the pagination is shown correctly - 50 rows in 1 page', () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  
  
      
  });
     
    test('C28400 Running flows tab -Verify the pagination is shown correctly - 50 rows in 1 page', async ({
      io,
      page
    }) => {
      await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
      await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"50");
      await io.homePage.clickByText("50Flows_TC_28400"); 
      await io.homePage.loadingTime();
      let i =1;
      while(i<51)
      {
        await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.RUN_FLOW,i);
        i++;
        
      }
      await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
      await io.assert.verifyElementDisplayedByText("1 - 50 of 50","Count is not expected");
      
      
     
       
     
      
    });
});