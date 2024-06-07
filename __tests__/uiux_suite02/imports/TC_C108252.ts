import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108252 Verify Revise field help text: Concurrency ID lock template", () => {
  test("@Env-All @Zephyr-IO-T26351 C108252 Verify Revise field help text: Concurrency ID lock template", async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP CONNECTION');
    await io.flowBuilder.clickByTextByIndex('HTTP CONNECTION', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'HTTP_Import');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.click(selectors.importPagePO.CONCURRENCY_HELPTEXT);
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    const concurrencyHelptext = (await io.flowBuilder.getText(selectors.myAccountPagePO.HELP_BUBBLE)) as string;
    await io.assert.expectToContainValue(`Concurrency ID lock template`,concurrencyHelptext,"helptext not found"
    );
  });
});
