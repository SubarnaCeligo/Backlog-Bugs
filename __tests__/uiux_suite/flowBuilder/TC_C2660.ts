import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2660 Verify export is hidden which is once used in the flow.", () => {
  test("C2660 Verify export is hidden which is once used in the flow.", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click('[data-test="HTTP"]');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'C2660_export');
    await io.flowBuilder.click('[data-test="http.method"]');
    await io.flowBuilder.click('[data-value="GET"]');
    await io.flowBuilder.fill('[id="text-http.relativeURI"]', '/customers');
    await io.flowBuilder.click('[id="mui-component-select-/type"]');
    await io.flowBuilder.click('[data-value="all"]');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    const exportURL = page.url();
    const exportID = exportURL.split('/').pop();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    await io.flowBuilder.click('[data-test="addGenerator"]');
    await io.flowBuilder.click('[data-test="HTTP"]');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click('[name="checkExistingExport"]');
    const isExportNotVisible = !await io.flowBuilder.isVisible(`[value="${exportID}"]`);
    await io.assert.expectToBeTrue(isExportNotVisible, 'The added export is visible');
  });
});