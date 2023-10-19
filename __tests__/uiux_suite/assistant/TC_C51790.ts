import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51790 Verify 'Can't Find' Link under connection form when toggle is under simple`, () => {
  test(`C51790 Verify 'Can't Find' Link under connection form when toggle is under simple`, async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    // todo replace: selectors.connectionsPagePO.LITMOS_CONNECTION
    await io.connectionPage.click('[data-test="Litmos"]');
    await io.assert.verifyElementDisplayedByText(
      "Can't find?",
      "'Can't find?' link not displayed"
    );
  });
});
