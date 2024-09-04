
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C26588_Disable_strict_SSL_option_should_be_display ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4475 TC_C26588_mysql_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);
    test.step("*** clicked on mysql adaptor ***", async ()=>{});

    // removed breaking code
    
    await io.homePage.click("[data-test='rdbms.disableStrictSSL']");
    test.step("*** Clicking on Disable Strict SSL Option  ***", async ()=>{});
    var result = await io.homePage.getTextFromElement("[id='rdbms.disableStrictSSL']", "Disable strict SSL");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Verified the  Disable strict SSL Option is Displaying  ***", async ()=>{});
    // removed unwanted breaking code
  });
});
