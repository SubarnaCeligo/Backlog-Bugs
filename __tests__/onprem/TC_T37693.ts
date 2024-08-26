import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T37693_Verify system behavior when attempting to create a new postgresql, mysql, mssql import without selecting on-premise connection", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37693 T37693_Verify system behavior when attempting to create a new postgresql import without selecting on-premise connection", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.addStep("*** Click on add destination or lookup ***");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Click on POSTGRESQL application ***");
    await io.homePage.click(selectors.flowBuilderPagePO.POSTGRESQL_APPLICATION);
    await io.homePage.addStep("*** Select import records option ***");
    await io.flowBuilder.clickByText(
      "Import records into destination application"
    );
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "POSTGRESQL CONNECTION"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );

    await io.homePage.addStep(
      "*** Click on 'name' field and gave a name to our import ***"
    );
    await io.homePage.click(selectors.basePagePO.ADD_NAME);
    await page.keyboard.press("/");

    await io.homePage.addStep("*** Open the import ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE
    );

    await io.homePage.addStep("*** Verify new UI is displayed ***");
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
    await io.homePage.addStep("*** Navigated back to home page ***");
  });
  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37693 T37693_Verify system behavior when attempting to create a new mysql import without selecting on-premise connection", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.addStep("*** Click on add destination or lookup ***");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Click on MYSQL application ***");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Mysql');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MYSQL);
    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);
    await io.homePage.addStep("*** Select import records option ***");
    await io.flowBuilder.clickByText(
      "Import records into destination application"
    );
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "MYSQL CONNECTION"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );

    await io.homePage.addStep(
      "*** Click on 'name' field and gave a name to our import ***"
    );
    await io.homePage.click(selectors.basePagePO.ADD_NAME);
    await page.keyboard.press("/");

    await io.homePage.addStep("*** Open the import ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE
    );

    await io.homePage.addStep("*** Verify new UI is displayed ***");
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
    await io.homePage.addStep("*** Navigated back to home page ***");
  });
  test("@Epic-IO-46210 @Env-QA @Priority-P2 @Zephyr-IO-T37693 T37693_Verify system behavior when attempting to create a new mesql import without selecting on-premise connection", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.addStep("*** Click on add destination or lookup ***");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Click on MSSQL application ***");
    await io.homePage.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    await io.homePage.addStep("*** Select import records option ***");
    await io.flowBuilder.clickByText(
      "Import records into destination application"
    );
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "MSSQL CONNECTION"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );

    await io.homePage.addStep(
      "*** Click on 'name' field and gave a name to our import ***"
    );
    await io.homePage.click(selectors.basePagePO.ADD_NAME);
    await page.keyboard.press("/");

    await io.homePage.addStep("*** Open the import ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE
    );

    await io.homePage.addStep("*** Verify new UI is displayed ***");
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
    await io.homePage.addStep("*** Navigated back to home page ***");
  });
});
