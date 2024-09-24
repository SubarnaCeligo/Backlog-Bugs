import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34887 verifying the presence of Restricted report type checkbox /reports/2021-06-30/documents/ relative URI", () => {
    test("C34887 verifying the presence of Restricted report type checkbox /reports/2021-06-30/documents/ relative URI @Zephyr-IO-T6750 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon Seller Central');
        await io.connectionPage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'AMAZON SP API CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.exportsPage.fill(
            selectors.exportsPagePO.NAME,
            "Export"
          );
        await io.connectionPage.click(selectors.flowBuilderPagePO.FORMVIEW );
        await io.homePage.clickByText("HTTP");
        await io.exportsPage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.homePage.clickByText("GET");
        await io.exportsPage.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/reports/2021-06-30/documents/');
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.RESTRICTED_REPORT_TYPE, 'Checkbox is not displayed');

        await io.connectionPage.click(selectors.exportsPagePO.RESTRICTED_REPORT_TYPE_HELP);
        
        const secretText = (await io.flowBuilder.getText(
          selectors.myAccountPagePO.HELP_BUBBLE
            )) as string;
      
            await io.assert.expectToContainValue(
              `Check the box if the report to be fetched is of restricted type. Please see here to understand which report type(s) are restricted`,
              secretText,
              "secrettext name not found"
            );
    });
});