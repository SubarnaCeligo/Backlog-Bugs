import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the default field label in existing Amazon Redshift connections", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All  @Zephyr-IO-T23964 Verify the default field label in existing Amazon Redshift connections", async ({ io, page }) => {
    // Open an existing Amazon Redshift connection
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'Amazon Redshift')
    await io.connectionPage.clickByText('AMAZON REDSHIFT CONNECTION');

    //Get the labels of default fields
    const default_database_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_DB_NAME_LABEL)) as string;
    const default_cluster_name = (await io.connectionPage.getText(selectors.connectionsPagePO.DEFAULT_CLUSTER_NAME_LABEL)) as string;

    // Verify the labels of default fields.
    await io.assert.expectToContainValue('Default database name', default_database_name, 'Labels do not match');
    await io.assert.expectToContainValue('Default cluster name', default_cluster_name, 'Labels do not match');

 });

}
)
