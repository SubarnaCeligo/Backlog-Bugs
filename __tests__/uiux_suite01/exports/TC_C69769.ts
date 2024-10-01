import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C69769 For both exports and imports, name field is still showing as sap litmos watermark instead of litmos`, () => {
  //Skipped this test case as we don;t have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  test(`@Env-All @Zephyr-IO-T20886 C69769 For both exports and imports, name field is still showing as sap litmos watermark instead of litmos`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.click(selectors.connectionsPagePO.LITMOS_CONNECTION);
    await io.exportsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.exportsPage.fill(selectors.exportsPagePO.NAME, "Litmos Export");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.waitForElementAttached(
      selectors.exportsPagePO.WHAT_WOULD_YOU_LIKE_TO_EXPORT_TAB
    );
    await io.assert.verifyElementAttribute(
      selectors.exportsPagePO.NAME,
      "placeholder",
      "Litmos export"
    );
  });
});
