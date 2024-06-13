import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2860 Verify auto registering functionality for tile level permission", () => {
  test("@Env-All @Zephyr-IO-T1424  C2860 Verify auto registering functionality for tile level permission", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.assert.verifyElementNotBeFound(selectors.basePagePO.TEST_CONNECTION)
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT,'HTTP ZENDESK CONNECTION');
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("Basic");
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.TEST_CONNECTION, "Test connection not available")
  });
});