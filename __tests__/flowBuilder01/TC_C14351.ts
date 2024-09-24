import { test, expect } from "@celigo/ui-core-automation";
import C14351 from '../../testData/inputData/FlowBuilder/C14351.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify user should not see alert 133- XSS in debug tab of Flow builder page", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        
    });
    test("Verify user should not see alert 133- XSS in debug tab of Flow builder page when a connection named '><img src=x onerror=prompt(133)>' is used @Env-All @Priority-P2 @Zephyr-IO-T2935", async ({
        io, page
    }) => {
        //Test Rail - https://celigo.testrail.io/index.php?/cases/view/14351
        //Create a flow that uses an existing connection named ' "><img src=x onerror=prompt(133)> '
        await io.createResourceFromAPI(C14351, "FLOWS");

        //Note: connections in a flow are not immeditely listed, hence open the export and close it to view connections
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

        //Open connections tab
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CONNECTIONS_TAB);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB);

        //Open actions menue and click on 'Debug Connection'
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);

        //Validate no alert is displayed upon clicking 'Debug Connection'
        const alertVisible = await page.getByRole("alert").isVisible();
        await io.assert.expectToBeTrue(!alertVisible,"Alert is visible")
  
    });
});