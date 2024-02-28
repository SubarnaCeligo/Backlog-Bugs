import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22828 Verify Online or offline connection - to always show, and not disappear after some time", () => {

  test("C22828 Verify Online or offline connection - to always show, and not disappear after some time", async ({ io, page }) => {
    await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
    //Flow Description on Integration page C115168 C115169
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
    await io.exportsPage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CONNECTION_TABLE, 0);
    await io.exportsPage.loadingTime();
    // Define selectors for both online and offline elements
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONNECTION_STATUS);
    // Get the value of the aria-label attribute
    const connectionStatus = await page.$eval(selectors.flowBuilderPagePO.CONNECTION_STATUS, (span) => span.getAttribute('aria-label'));  
    let result = connectionStatus === 'error' || connectionStatus === 'success';;
    // Determine the connection status based on the aria-label value
    await io.assert.expectToBeTrue(result , "Connection is not Online and Offline")
   })
});       