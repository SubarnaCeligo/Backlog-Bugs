import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103657 Verify with Manage/Monitor role user is able to see following options in account sub menu", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C103567 Verify with Manage/Monitor role user is able to see following options in account sub menu", async ({
    io,
    page
  }) => {
    await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.flowBuilder.isVisible('text="Profile"');
    await io.flowBuilder.isVisible('text="Security"');
    await io.flowBuilder.isVisible('text="Send feedback"');
  });
});
