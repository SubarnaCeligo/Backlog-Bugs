import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`@Author_MaheshNivruttiSutar Users with tile-level access are able to clone my flow to standalone flows.`, () => {
    test(`@Bug-IO-79602 @Env-All @Priority-P2 @Zephyr-IO-T31975`, async ({ page, io }) => {
        const res = await io.api.putCall(
            `v1/ashares/${process.env.IO_Ashare_ID}`,
            testData
        );
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Automation Flows');
        await io.homePage.clickByText("Automation Flows");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU, 3);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Clone flow");
        await io.flowBuilder.clickByText("Please select");
        const createNew = await io.flowBuilder.isVisible("text='Standalone flows'")
        await io.assert.expectToBeFalse(createNew, "Standalone flows integration is showing");
    });
});
