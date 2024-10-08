
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C27982_HTTP_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4497 @Env-All TC_C27982_HTTP_connection_type _should_Custom_setting ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.loadingTime();
    var checked = await page.locator(
      selectors.flowBuilderPagePO.DEVELOPER_MODE
    ).isChecked();
    await io.homePage.loadingTime();
    if (checked === true) {
      test.step("***Checked The Developer Mode***", async ()=>{});
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.DEVELOPER_MODE
      );
      test.step("***Checked The Developer Mode***", async ()=>{});
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      test.step("***Clicking On Save***", async ()=>{});
    }

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicked on connections ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_Connection");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://slack.com/api"
    );
    test.step("*** Naming the Base URL Field   ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "custom");
    test.step("*** Selecting custom from the dropdown  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    test.step("*** clicked Custom setting   ***", async ()=>{});
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.CUSTOM_SETTING, "Custom settings");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Custom setting is displying or not and verification   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});

    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.loadingTime();
    var checked = await page.locator(
      selectors.flowBuilderPagePO.DEVELOPER_MODE
    ).isChecked();
    await io.homePage.loadingTime();
    if (checked === true) {
      await io.homePage.click(
        selectors.flowBuilderPagePO.DEVELOPER_MODE
      );
      test.step("***Unchecked The Developer Mode***", async ()=>{});
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      test.step("***Clicking On Save***", async ()=>{});
      test.step("***Unchecked The Developer Mode***", async ()=>{});
    } else {
      test.step("***Unchecked The Developer Mode***", async ()=>{});
    }
    await io.homePage.loadingTime();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
