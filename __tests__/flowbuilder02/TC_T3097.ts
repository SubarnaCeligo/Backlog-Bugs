import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T3097 from "@testData/Flows/TC_T3097.json";

test.describe("T3097 Custom settings should not be Shrinked once we select script and save in the Form builder @author_Kaushik UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Zephyr-IO-T3097 Custom settings should not be Shrinked once we select script and save in the Form builder @author_Kaushik UI_Backlog @Env-All @Priority-P2", async ({ io, page }) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(T3097, "FLOWS");

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CUSTOM_EDITOR);
    await io.flowBuilder.clickByText("Launch form builder")
    await io.flowBuilder.clickByText("Script")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOURCE_SCRIPT_ID);
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU, 1);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    // check if editor is available after removing the script
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Launch form builder")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOURCE_SCRIPT_ID);
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONDROPDOWNMENU, 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CUSTOM_EDITOR);

    //Clean up
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});