import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Zephyr-TC_IO-52568 Change the default data to defaults in DB import`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`@Env-All @Zephyr-TC_IO-52568 Change the default data to defaults in DB import.`, async ({
    page,
    io
  }) => {
    await io.homePage.goToMenu("Resources", "Imports");
    await io.importsPage.click(selectors.importPagePO.IMPORT_CREATE_CONNECTION)
    await io.importsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MySQL');
    await io.importsPage.click(selectors.flowBuilderPagePO.MYSQL);
    await io.importsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.importsPage.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "MYSQL CONNECTION"
    );
    await io.importsPage.clickByTextByIndex("MYSQL CONNECTION", 0);
    await io.importsPage.fill(
      selectors.basePagePO.ADD_NAME + " input",
      "MYSQL IMPORT"
    );
    await io.importsPage.click(selectors.basePagePO.SAVE)
    await io.importsPage.click(selectors.importPagePO.MARIADB_PER_RECORD)
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.QUERY1 + " " + selectors.myAccountPagePO.TEXTELEMENTS, "SQL query tab is not present")
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.QUERY1 + " " + selectors.myAccountPagePO.TEXTELEMENTS,"SQL query *")
    

    await io.importsPage.clickByIndex(selectors.basePagePO.HANDLEBAR_EDITOR, 0)
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.DEFAULT, "Defaults tab is not present")
    await io.assert.verifyElementText(selectors.flowBuilderPagePO.DEFAULT,"Defaults")
    
  });
});
