import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C104208 Verify sql query field visible for Use SQL query once per record,Use SQL query once per page of records,Use SQL query on first page only fields in MSSQL import UI_Backlog", () => {
  test("C104208 Verify sql query field visible for Use SQL query once per record,Use SQL query once per page of records,Use SQL query on first page only fields in MSSQL import UI_Backlog @Zephyr-IO-T8680 @Env-All @Priority-P2", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    await io.flowBuilder.clickByText(
      "Import records into destination application"
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'MSSQL CONNECTION');
    await io.flowBuilder.clickByText('MSSQL CONNECTION');

    await io.flowBuilder.clickByText(
      "Use SQL query once per record"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.QUERYOPENHANDLEBAR,
      "SQL query field is not visible for Use SQL query once per record"
    )

    await io.flowBuilder.clickByText(
      "Use SQL query once per page of records"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.QUERYOPENHANDLEBAR,
      "SQL query field is not visible for Use SQL query once per page of records"
    )

    await io.flowBuilder.clickByText(
      "Use SQL query on first page only"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.QUERYOPENHANDLEBAR,
      "SQL query field is not visible for Use SQL query on first page only"
    )

  });
});
