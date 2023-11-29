import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C53078 Verify the update access for the Data retention period should only be available for the Admin user and Account owner only but not other users", () => {
  test("C53078 Verify the update access for the Data retention period should only be available for the Admin user and Account owner only but not other users", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      const isDataRetentionNotVisible = !(await io.myAccountPage.isVisible(selectors.myAccountPagePO.DATA_RETENTION));
      await io.assert.expectToBeTrue(isDataRetentionNotVisible, "Data retention tab visible for users other tha owner/admin");
  });
});