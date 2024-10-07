
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C29577_Sorting_And_Grouping_option_verification.json";

test.describe("TC_C29577_Sorting_And_Grouping_option_verification", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T11664 @Env-All TC_C29577_Sorting_And_Grouping_option_verification", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on FTP Export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** Validating the sort and group field in FTP Export ***", async ()=>{});
    let data = await io.homePage.isVisible(selectors.flowBuilderPagePO.SORTANDGROUP);
    await io.assert.expectToBeTrue(data, "");
  });
});
