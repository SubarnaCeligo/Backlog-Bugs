import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T20433 from "@testData/FlowBuilder/T20433.json";


test.describe("@Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", () => {
    let flowId;
    test("@Env-All @Zephyr-IO-T20433 C66282 Verify flow cancel information with flow having multiple exports and make connection offline", async ({ io, page }) => {
       
    flowId = await io.createResourceFromAPI(T20433, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.addStep("Running the flow");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPORT,0);
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, '- Offline');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
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