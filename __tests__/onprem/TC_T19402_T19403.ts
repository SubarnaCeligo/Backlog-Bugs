import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_T19402_TC_T19403 Verify new UI should be shown for all the new imports ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T19403_T19403 @Env-All @Priority-P2 Verify new UI should be shown for all the new imports ", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
        selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Clicked on add destination or lookup ***");
    await io.homePage.click(selectors.flowBuilderPagePO.ORACLEDB_APPLICATION);
    await io.homePage.addStep("*** Clicked on ORACLE application ***");
    await io.flowBuilder.clickByText("Import records into destination application");
    await io.homePage.addStep("*** Selected import records option ***");
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ORACLE_DB_Connection');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME);
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "NEW");
    await io.assert.checkElementState(selectors.importPagePO.MARIADB_INSERT_BULK,'isChecked');
  let isNewUI = false;
    try
  {
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
    
    isNewUI = true
  }
  catch(e){
    expect(isNewUI).toBeTruthy();
  }
  expect(isNewUI).toBeTruthy();
  });
}
)
