import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C33306.json";
import {
  isValidLocalTimeFormat,
  isRelativeTimeFormat
} from "@celigo/aut-utilities";
test.describe("TC_T25696", () => {
    test("@Env-All @Zephyr-IO-T25696 TC_T25696", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
      await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION,"Error_FLOW2_DND");
      await io.homePage.clickByText("Error_FLOW2_DND"); 
      await io.homePage.loadingTime();
      await io.homePage.clickByText("Google_BIGQUERY_FLOW_DND"); 
      await io.homePage.loadingTime();
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await io.homePage.addStep("*** Opened mappings page ***");
      await io.homePage.loadingTime();
      await io.homePage.loadingTime();
      await io.homePage.loadingTime();
      await io.homePage.loadingTime();
      await io.homePage.clickByText("Refresh fields")
      await io.homePage.addStep("*** clicked on refresh fields ***");
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    });
  });