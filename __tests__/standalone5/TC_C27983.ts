
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Custom from "@testData/STANDALONE/TC_C27983.json";

test.describe("TC_C27983_HTTP_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T4498 @Env-All TC_C27983_HTTP_connection_type ", async ({io,page}, testInfo) => {
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
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C27983");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://test.com");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "custom");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "");
    await io.homePage.enterHugeData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE,
      JSON.stringify(Custom.customSettings)
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    test.step("*** clicked Custom setting   ***", async ()=>{});
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.CUSTOM_SETTING, "Custom settings");
    await io.assert.expectToBeTrue(result, "");

    var element = await(await page.locator("//span[text()='Confirm delete..?']")).isVisible();
    await io.assert.expectToBeTrue(element, "");

    await io.homePage.click(selectors.basePagePO.CLOSE);

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
  });
});
