
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C50648.json";


test.describe("TC_C28147_REST_connection_type.", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(TC.PostBody.name);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T4517 @Env-All TC_C28147_REST_connection_type _should_Custom_setting ", async ({io,page}, testInfo) => {
    let response = await io.api.postCall( "v1/connections",  JSON.stringify(TC.PostBody));

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async ()=>{});
    await io.homePage.reloadPage();
    test.step("** Refreshing Home Page ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.basePagePO.ACCOUNT_BUTTON
    );
    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.loadingTime();
    let checked = await page.locator(
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

    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLOSEBYTEXT, "Create connection");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    test.step("*** Closing the window ***", async () => {});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C50648_Connection");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.myAccountPagePO.CONN_NAME);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    test.step("*** clicked Custom setting   ***", async ()=>{});
    let result = await io.homePage.getTextFromElement(selectors.basePagePO.CUSTOM_SETTING, "Custom settings");
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
    checked = await page.locator(
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
