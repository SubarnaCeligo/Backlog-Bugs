import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24850 Verify that the flow event report results are sorted by the timestamp by default -(most recent at the top)", () => {
    test("C24850 Verify that the flow event report results are sorted by the timestamp by default -(most recent at the top) @Zephyr-IO-T4276 @Env-All @Priority-P2", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
        await io.homePage.goToMenu("Tools","Reports");
        for(let i=0; i<3; i++){
          await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
          await io.homePage.waitForElementAttached(selectors.basePagePO.INTEGRATION_ID);
          await io.homePage.clickByIndex(selectors.basePagePO.INTEGRATION_ID,0);
          await io.homePage.click('[role="menuitem"]:has-text("Standalone Flows")');
          await io.homePage.clickByText('Choose flows');
          await io.homePage.waitForElementAttached(selectors.exportsPagePO.PRIVATE_SWITCH_BASE_ROOT);
          await io.homePage.clickByIndex(selectors.exportsPagePO.PRIVATE_SWITCH_BASE_ROOT, 0);
          await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
          await io.homePage.clickByText('Choose date range');
          await io.homePage.clickByText('Last 24 hours');
          await io.homePage.clickByText('Apply');
          await io.homePage.click(selectors.basePagePO.SAVE);
        }
        const reportist = await page.locator(`${selectors.flowBuilderPagePO.COLUMNS} td`).nth(3).all();
  
        for(let i=0; i<reportist.length-1; i++){
          let curDate = new Date(`${await reportist[i].innerText()}`);
          let nextDate = new Date(`${await reportist[i+1].innerText()}`);
          await io.assert.expectToBeTrue(curDate>nextDate, 'The list is not sorted according to timestamp');
        }
    });
  });