import {expect, test} from "@celigo/ui-core-automation";
const fs = require('fs');
import * as selectors from "@celigo/aut-selectors";
import { HomePage } from "@celigo/ui-core-automation/dist/src/pageFactory/pages/HomePage";
test.describe("C110451 Verify user is able to download the agent on Linux machine. @Priority-P2 @Zephyr-IO-T18511 @ENV-All", () => {
    test.beforeEach(async ({ io }) => {
         
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.click(selectors.basePagePO.AGENTS);
        
    });
    test("@Env-All @Zephyr-IO-T18511 C110451 Verify user is able to download and the agent on Linux machine.", async ({io, page}) => {
       
     await io.homePage.click(selectors.homePagePO.DOWNLOAD_AGENT_INSTALLER);
     await io.assert.verifyElementDisplayedByText("Linux","Linux option is not available");   
     await io.homePage.clickByText("Linux");
     const download = await page.waitForEvent('download');
     const suggestedFileName = download.suggestedFilename()
     expect(download.suggestedFilename()).toBe("agent-linux.run");
    });
});