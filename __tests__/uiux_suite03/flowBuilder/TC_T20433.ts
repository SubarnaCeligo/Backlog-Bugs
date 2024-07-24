import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T20433 from "@testData/FlowBuilder/T20433.json";


test.describe("@Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", () => {
    let flowId;
    test.beforeEach(async ({ io }) => {
      await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      await io.homePage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
      await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
      await io.flowBuilder.loadingTime();
      await io.homePage.fill(selectors.basePagePO.NAME, 'Offline Connection');
      await io.homePage.fill(selectors.connectionsPagePO.BASE_URI_INPUT, 'https://anyrandom.url');
      await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
      await io.homePage.clickByText("Custom");
      await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime();
      // await io.homePage.clickByIndex(selectors.basePagePO.SAVE,1);
    });
    test("@Env-All @Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", async ({ io, page }) => {
       
    flowId = await io.createResourceFromAPI(T20433, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT,0);
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'Offline Connection');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.flowBuilder.clickByTextByIndex('Offline Connection', 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.REPLACE);
    await io.flowBuilder.loadingTime();
    await page.locator(selectors.basePagePO.TOOLTIP).first().click();
    const text = (await io.flowBuilder.getText(
        selectors.myAccountPagePO.DATARETENTIONTOOLTIP
      )) as string;
  
      await io.assert.expectToContainValue(
        `Canceled by system`,
        text,
        "error"
      );
    });

});
