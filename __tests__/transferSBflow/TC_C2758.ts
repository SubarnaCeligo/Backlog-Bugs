import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";

test.describe(`C2758 Verify when the sandbox tile is shared with a non sandbox license user the shared tile should be shown in the production account_UI_Backlog`, () => {
  test(`C2758 Verify when the sandbox tile is shared with a non sandbox license user the shared tile should be shown in the production account_UI_Backlog`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON)
    const bool = await io.homePage.isVisible("text='Clone - EM'")
    await io.assert.expectToBeValue(bool.toString(), "true", "Flows not present in Sandbox")


  });
});
