import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T24347", () => {
    test("@Env-All @Zephyr-IO-T24347 TC_T24347", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
      await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"Error_FLOW2_DND");
      await io.homePage.clickByText("Error_FLOW2_DND"); 
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
      await io.myAccountPage.waitForElementAttached(selectors.basePagePO.RUNFLOW)
      await io.homePage.addStep("*** Flow ran successfully ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("More");
      await io.homePage.addStep("*** Clicked on more ***");
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.loadingTime();
      await io.homePage.clickByText("Download files");
      await io.homePage.addStep("*** Clicked on download files to download the files ***");
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    });
  });