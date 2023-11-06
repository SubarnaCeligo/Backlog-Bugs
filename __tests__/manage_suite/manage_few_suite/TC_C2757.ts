import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C2757 Verify the production shared tiles are not shown in the sandbox account`, () => {
  test(`C2757 Verify the production shared tiles are not shown in the sandbox account`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.click('[data-test="Sandbox"]')
    const bool = await io.homePage.isVisible("text='1 - TC_C68492-DND'")
    await io.assert.expectToBeValue(bool.toString(), "false", "Flows are present in Sandbox")


  });
});
