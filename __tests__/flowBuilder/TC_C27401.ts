import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C27401.json";

test.describe("TC_C27401", () => {
  let integration1Id;
  test.beforeEach(async ({io}) => {
    let postSubmit = await io.api.getScriptId(TC.scriptBody.name);
    if (!postSubmit)
      postSubmit = await io.api.createScriptViaAPI(
        TC.scriptBody
      );
    TC.qa__api_tdata[0].createIntegrations.flowGroupings[0].settingsForm.init._scriptId =
      postSubmit;
    test.step("Beginning of Test Suite", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    test.step("Deleting integration", async ()=>{});
    await io.api.deleteIntegration(integration1Id);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2828|To verify flowgrouping init function is invoked properly(with settingsForm)", async ({io,page}) => {
    integration1Id = await io.api.createIntegrationThruAPI(TC);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const checked = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();

    if (checked == true) {
      test.step("***Checked The Developer Mode***", async () => { });
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.DEVELOPER_MODE);
      test.step("***Checked The Developer Mode***", async () => { });
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.ilm.navigateToIntegrationById( integration1Id);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.SETTINGS
    );
    await io.homePage.loadingTime();
    expect(await page.locator("[id='txtSetting2ForIntegration']").isVisible()).toBeTruthy();
    expect(await page.getByText("Update Flow Field LabelText Integration Setting").isVisible()).toBeTruthy();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,1);
    expect(await page.getByText("Update Flow Field LabelText Integration Setting. txtSetting2ForIntegration.").isVisible()).toBeTruthy();
    
  });
});
