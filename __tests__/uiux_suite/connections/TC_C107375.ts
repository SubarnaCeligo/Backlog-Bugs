import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify labels of default fields in Amazon Redshift connection form", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify labels of default fields in Amazon Redshift connection form", async ({ io, page }) => {
    // Click on 'Create connection', Select 'Amazon Redshift'
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Amazon');

    await io.connectionPage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);

    const default_database_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_DB_NAME_LABEL)) as string;
    const default_cluster_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_CLUSTER_NAME_LABEL)) as string;

    // Verify the labels of default fields.
    await io.assert.expectToContainValue('Default database name', default_database_name, 'Labels do not match');
    await io.assert.expectToContainValue('Default cluster name', default_cluster_name, 'Labels do not match');
 
    
  });

}
)
