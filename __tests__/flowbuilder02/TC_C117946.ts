import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C117946_Testing new key board shortcuts enhancements in transformation2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117946 @Env-All @Zephyr-IO-T18848 @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FLOW_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on Add data processor button to add transformations ***");
        await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.homePage.clickByText("Rules 2.0");
        await io.homePage.addStep("*** Navigated to transformation rules 2.0 ***");
        await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER);
        await io.homePage.addStep("*** Clicked on handle bar field ***");
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.homePage.addStep("*** Invoked the dropdown by typing '{{{' ***");
        await page.keyboard.press('a');
        await page.keyboard.press('b');
        await page.keyboard.press('s');
        await io.homePage.addStep("*** Started to write expression ***");
        await page.keyboard.press('Control+Space');
        await io.homePage.addStep("*** Accessing the dropdown ***");
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await io.homePage.addStep("*** Navigated to the helper ***");
        await io.flowBuilder.delay(3000);
        await io.homePage.addStep("*** Wait time for 3secs so that hover text pops up ***");
        await page.keyboard.press('Enter');
        await io.homePage.addStep("*** Hover text is visible ***");
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
});