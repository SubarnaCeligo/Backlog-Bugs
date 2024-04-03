import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41552 To verify create pull button is not displayed under 'Revisions' tab for Templates(users who has Account level monitor access)", () => {
  test("@Env=all C41552 To verify create pull button is not displayed under 'Revisions' tab for Templates(users who has Account level monitor access)", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("HTTP_DND integration");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Revisions");
    await io.assert.checkElementState(
      selectors.integrationPagePO.CREATE_PULL,
      "isHidden"
    );
  });
});
