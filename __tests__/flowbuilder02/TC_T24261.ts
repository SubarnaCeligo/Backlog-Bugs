import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T24261_T24262_T24263_T24264_T24265_T24266_T24267 verifying create from scratch button functionality", () => {
    test("@Epic-IO-54540 @Priority-P2 @Zephyr-IO-T24261 @Zephyr-IO-T24262 @Zephyr-IO-T24263 @Zephyr-IO-T24264 @Zephyr-IO-T24265 @Zephyr-IO-T24266 @Zephyr-IO-T24267 @Env-All verifying create from scratch button functionality", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        // export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).toBeDisabled();
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.homePage.clickByText("HTTP ZENDESK CONNECTION");
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).not.toBeDisabled();
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "Export name");
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        // lookup
        await io.homePage.loadingTime()
        await io.connectionPage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.clickByText(
            "Look up additional records (per record)"
        );
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).toBeDisabled();
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.homePage.clickByText("HTTP ZENDESK CONNECTION");
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).not.toBeDisabled();
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "Lookup name");
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD_GET);
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/test");
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        // import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).toBeDisabled();
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.homePage.clickByText("HTTP ZENDESK CONNECTION");
        await expect(
            page.locator(selectors.importPagePO.CLICKPREVIEW)
          ).not.toBeDisabled();
        await io.exportsPage.fill(selectors.exportsPagePO.NAME, "Import name");
        await io.flowBuilder.click(selectors.exportsPagePO.LOOKUP.HTTP_METHOD);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
});