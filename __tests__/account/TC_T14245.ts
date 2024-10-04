import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T14245", () => {
    test("@Zephyr-IO-T14245 @Env-All TC_T14245 @Priority-P2", async ({
        io,
        page
    }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.goToMenu("Resources", "Connections");
        await io.homePage.addStep("*** Navigated to connections page ***");
        await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.homePage.addStep("*** Clicked on create connection ***");
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Magen');
        await io.homePage.addStep("*** Filled the app name ***");
        await io.homePage.clickByText("Magento 2");
        await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').click();
        await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').fill('Magneto');
        await io.homePage.addStep("Added connection name and invalid details");
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.addStep("verified connection is not getting saved");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
})