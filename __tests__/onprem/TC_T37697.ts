import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T37697 from "@testData/onprem/T37697.json";

test.describe("T37697_Verify cloning of flow with new import form agent connection", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zepehyr-IO-T37697 T37697_Verify cloning of flow with new import form using agent connection", async ({ io, page }) => {
    T37697.name = `${T37697.name}-${Math.random().toString(36).slice(2, 7)}`;
    await io.flowBuilder.addStep("*** Create a new flow ***");
    const flowid = await io.createResourceFromAPI(T37697, "FLOWS");
    await io.flowBuilder.loadingTime()

    await io.flowBuilder.addStep("*** Clone the flow ***");
    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION);
    await io.flowBuilder.clickByText('Automation_flows');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Configure connections ***");
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("POSTGRESQL ONPREM CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("MYSQL ONPREM CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("MSSQL ONPREM CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.flowBuilder.selectTextfromDropDown(page, connId);
    await io.flowBuilder.clickByText("Done");
    for (let i = 0; i < 3; i++) {
      await io.flowBuilder.loadingTime();
    }

    await io.flowBuilder.addStep("*** Open the cloned flow ***");
    await io.flowBuilder.clickByText(`Clone - ${T37697.name}`);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open PostgreSQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify all the elements are present in import ***");
    await io.assert.verifyElementDisplayedByText(
      "Destination table *",
      "Destination table is not added"
    );
    await io.flowBuilder.loadingTime();
    await io.assert.checkElementState(
      selectors.importPagePO.REFRESH_BUTTON,
      "isVisible"
    );
    await io.importsPage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON
    );
    await io.assert.verifyElementDisplayedByText(
      `Select a data destination for bulk inserts. You can bulk insert data into a table.`,
      "prefix lookup text is incorrect"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    let isNewUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Use bulk insert SQL query (recommended)",
        "'Insert is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per record",
        "Use SQL query once per record is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per page of records",
        "Use SQL query once per page of records is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query on first page only",
        "Use SQL query on first page only is not present in New UI"
      );

      isNewUI = true;
    } catch (e) {
      expect(isNewUI).toBeTruthy();
    }
    expect(isNewUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close PostgreSQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open MSSQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify all the elements are present in import ***");
    await io.assert.verifyElementDisplayedByText(
      "Destination table *",
      "Destination table is not added"
    );
    await io.flowBuilder.loadingTime();
    await io.assert.checkElementState(
      selectors.importPagePO.REFRESH_BUTTON,
      "isVisible"
    );
    await io.importsPage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON
    );
    await io.assert.verifyElementDisplayedByText(
      `Select a data destination for bulk inserts. You can bulk insert data into a table.`,
      "prefix lookup text is incorrect"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    isNewUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Use bulk insert SQL query (recommended)",
        "'Insert is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per record",
        "Use SQL query once per record is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per page of records",
        "Use SQL query once per page of records is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query on first page only",
        "Use SQL query on first page only is not present in New UI"
      );

      isNewUI = true;
    } catch (e) {
      expect(isNewUI).toBeTruthy();
    }
    expect(isNewUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close MSSQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Open MySQL import ***");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 2);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Verify all the elements are present in import ***");
    await io.assert.verifyElementDisplayedByText(
      "Destination table *",
      "Destination table is not added"
    );
    await io.flowBuilder.loadingTime();
    await io.assert.checkElementState(
      selectors.importPagePO.REFRESH_BUTTON,
      "isVisible"
    );
    await io.importsPage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLE_HELPTEXT_ICON
    );
    await io.assert.verifyElementDisplayedByText(
      `Select a data destination for bulk inserts. You can bulk insert data into a table.`,
      "prefix lookup text is incorrect"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    isNewUI = false;
    try {
      await io.assert.verifyElementDisplayedByText(
        "Use bulk insert SQL query (recommended)",
        "'Insert is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per record",
        "Use SQL query once per record is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query once per page of records",
        "Use SQL query once per page of records is not present in New UI"
      );
      await io.assert.verifyElementDisplayedByText(
        "Use SQL query on first page only",
        "Use SQL query on first page only is not present in New UI"
      );

      isNewUI = true;
    } catch (e) {
      expect(isNewUI).toBeTruthy();
    }
    expect(isNewUI).toBeTruthy();

    await io.flowBuilder.addStep("*** Close MySQL Import ***");
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.loadingTime();
  });
});
