import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_C120208_TC_C120209 Verify new UI should be shown for all the new imports ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C120208_TC_C120209 Verify new UI should be shown for all the new imports ", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
        selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.addStep("*** Clicked on add destination or lookup ***");
    await io.homePage.click("[data-test= 'Oracle DB (SQL)']");
    await io.homePage.addStep("*** Clicked on ORACLE application ***");
    await io.flowBuilder.clickByText("Import records into destination application");
    await io.homePage.addStep("*** Selected import records option ***");
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "ORACLE_DB_Connection");
    await io.homePage.addStep("*** Searched for ORACLE CONNECTION ***");
    await io.homePage.clickByText('ORACLE_DB_Connection');
    await io.homePage.addStep("*** Selected  ORACLE connection ***");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.addStep("*** Clicked on next button ***");
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
