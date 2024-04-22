import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the hyperlink within the help text of Default cluster name in Amazon Redshift connection form", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T23963 Verify the hyperlink within the help text of Default cluster name in Amazon Redshift connection form", async ({ io, page }) => {

    // Click on 'Create connection', Select 'Amazon Redshift'
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Amazon');
    await io.connectionPage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);

    //Verify the hyperlink in 'Default cluster name' helptext
    await io.connectionPage.click(selectors.connectionsPagePO.DEFAULT_CLUSTER_HELPTEXT_BTN);
    await io.assert.verifyElementAttribute(selectors.connectionsPagePO.HELPTEXT_HYPERLINK, 'href', 'https://docs.aws.amazon.com/redshift/latest/mgmt/configuring-connections.html')
  });

}
)
