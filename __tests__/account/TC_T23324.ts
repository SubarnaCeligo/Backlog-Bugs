import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
 
test.describe("TC_T23324", () => {
    test("@Env-All @Zephyr-IO-T23324 TC_T23324", async ({io, page}) => {
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
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.myAccountPage.waitForElementAttached(selectors.basePagePO.RUNFLOW)
      await io.homePage.addStep("*** Flow ran successfully ***");
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Run console");
      await io.homePage.clickByText("1 error"); 
      await io.homePage.addStep("*** Opened Error bage ***");
      await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.homePage.addStep("*** clicked on retry and next button ***");
      await io.homePage.addStep("*** verified retry results ***");
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL) 
    });
  });