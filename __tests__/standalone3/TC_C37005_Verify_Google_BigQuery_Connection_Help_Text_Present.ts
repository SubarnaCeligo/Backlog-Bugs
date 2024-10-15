
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C37005_Verify_Google_BigQuery_Connection_Help_Text_Present", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Zephyr-IO-T7688 @Env-All TC_C37005_Verify_Google_BigQuery_Connection_Help_Text_Present", async ({io,page}, testInfo) => {
    //*Create Connection
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("** Selected Google BIgQuery as application **", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    test.step("*** Clicking on Client email help icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CLIENT_EMAIL_HELP);

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    test.step("*** Verifying help text is present ***", async ()=>{});
    var apiText = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    expect(apiText).toContain("The email address for the Google Cloud service account used for authentication.");

    test.step("*** Clicking on Google bigquery connection close ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
