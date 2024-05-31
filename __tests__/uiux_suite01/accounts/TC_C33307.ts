import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from '@testData/Flows/C33307.json';
 
test.describe("C33307 Verify if the checkbox is checked user should be see the relative time format and when they mousehover the timestamp column field relative format is displayed and the vice versa.", () => {
    test("@Env-STAGING @Zephyr-IO-T1478 C33307 Verify if the checkbox is checked user should be see the relative time format and when they mousehover the timestamp column field relative format is displayed and the vice versa.", async ({io, page}) => {
    
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX)
      const inputElement = await page.$(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX);
      const valueAttribute = await inputElement.getAttribute('value');
     if(valueAttribute === 'false')
      {
        await io.myAccountPage.click(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX)
        await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE)
      }
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
      await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"Error_FLOW_DND");
      await io.homePage.clickByText("Error_FLOW_DND"); 
      await io.homePage.loadingTime();
      await io.homePage.clickByText("Error_flow_DND"); 
      await io.homePage.click(selectors.basePagePO.RUNFLOW);
      await io.homePage.addStep("*** Running the flow ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
      await io.homePage.addStep("*** Flow ran succesfully ***");
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Run console"); 
      await io.homePage.clickByText("Run history"); 
      await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
      await io.homePage.addStep("*** Opened Error bage ***");
      await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX)
      await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE)
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
      await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"Error_FLOW_DND");
      await io.homePage.clickByText("Error_FLOW_DND"); 
      await io.homePage.loadingTime();
      await io.homePage.clickByText("Error_flow_DND"); 
      await io.homePage.click(selectors.basePagePO.RUNFLOW);
      await io.homePage.addStep("*** Running the flow ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
      await io.homePage.addStep("*** Flow ran succesfully ***");
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Run console"); 
      await io.homePage.clickByText("Run history"); 
      await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
      await io.homePage.addStep("*** Opened Error bage ***");
      await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL) 
    });
  });