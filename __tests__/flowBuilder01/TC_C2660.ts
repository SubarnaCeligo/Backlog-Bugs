import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2660 Verify export is hidden which is once used in the flow.", () => {
  test("C2660 Verify export is hidden which is once used in the flow. @Env-All @Priority-P2 @Zephyr-IO-T8876", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'C2660_export');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/customers');
    await io.flowBuilder.click(selectors.exportsPagePO.MUI_COMPONENT_SELECT_TYPE);
    await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  });
});