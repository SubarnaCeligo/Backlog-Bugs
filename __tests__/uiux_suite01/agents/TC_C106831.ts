import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106831", () => {
  test("C106831 Verify for Agent dropdown", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD);
    await page.keyboard.type("jdbc");
    await io.flowBuilder.clickByText("JDBC");
    await page.waitForTimeout(1000);
    await io.flowBuilder.click('[data-test="_agentId"]');
    
    // verify the agents are rendered
    const listbox = await page.$$(selectors.basePagePO.LISTBOX_ROLE + ' li');
    expect(listbox.length).toBeGreaterThan(1);
  });
});