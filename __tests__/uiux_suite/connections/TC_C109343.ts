import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the helptext for Default database name & Default cluster name in Amazon Redshift connection form", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify the helptext for Default database name & Default cluster name in Amazon Redshift connection form", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.connectionPage.clickByText('AMAZON REDSHIFT CONNECTION');

    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.DEFAULT_DB_NAME_LABEL);

    const default_database_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_DB_NAME_LABEL)) as string;
    const default_cluster_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_CLUSTER_NAME_LABEL)) as string;

    // Verify the labels of default fields.
    await io.assert.expectToContainValue('Database name', default_database_name, 'Labels do not match');
    await io.assert.expectToContainValue('Default cluster name', default_cluster_name, 'Labels do not match');


  });

}
)
