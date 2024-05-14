import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the helptext for Default database name & Default cluster name in Amazon Redshift connection form", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T23962 Verify the helptext for Default database name & Default cluster name in Amazon Redshift connection form", async ({ io, page }) => {
    
    // Click on 'Create connection', Select 'Amazon Redshift'
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Amazon');
    
    await io.connectionPage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);

    const helpBubble = selectors.myAccountPagePO.HELP_BUBBLE;
    const default_db_helptext_btn = selectors.connectionsPagePO.DEFAULT_DB_HELPTEXT_BTN;
    const default_cluster_helptext_btn = selectors.connectionsPagePO.DEFAULT_CLUSTER_HELPTEXT_BTN;
    const helptext_close = selectors.connectionsPagePO.HELPTEXT_CLOSE;

    //Verify the helptext for 'Default database name'
    await io.connectionPage.click(default_db_helptext_btn);
    await io.assert.verifyElementContainsText(helpBubble, 'Enter the default Redshift database name that you want to connect to.');
    await io.connectionPage.click(helptext_close);

    //Verify the helptext for 'Default cluster name'
    await io.connectionPage.click(default_cluster_helptext_btn);
    await io.assert.verifyElementContainsText(helpBubble,'Enter the default Redshift cluster name. For more information, see Find your cluster connection.');
    await io.connectionPage.click(helptext_close);

  });

}
)
