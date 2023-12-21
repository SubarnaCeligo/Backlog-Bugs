import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C63009 - Verify if API type and API version are displayed for the connection", () => {
  test("C63009 - Verify if API type and API version are displayed for the connection", async ({io, page}) => {
    //Navigate to Exports page and click on 'Create export'
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    //Wait for the page to load
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);

    //Search for NARVAR
    await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "NARVAR");
    await io.exportsPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);

    //Click on Select or Create connection and search for NARVAR CONNECTION
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.exportsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.exportsPage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, 'NARVAR CONNECTION');

    // Verify if API type and API version are displayed for the connection
    const connectionDetails = (await io.exportsPage.getText(selectors.exportsPagePO.CONNECTION_DROPDOWN_OPTIONS)).toString();
    await io.assert.expectToContainValue('API type:', connectionDetails, 'API type is not displayed' );
    await io.assert.expectToContainValue('API version:', connectionDetails, 'API version is not displayed' );

  });
});