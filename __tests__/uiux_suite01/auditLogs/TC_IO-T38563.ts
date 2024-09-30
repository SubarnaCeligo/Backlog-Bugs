import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Date-time filter should not show blank by default", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @Zephyr-IO-T38563'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        //Flowbuilder page
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
        await io.homePage.loadingTime();
        await page.getByText("Last 30 days").waitFor({ state: "visible", timeout: 360000 });

        //Last 30 days
        await io.assert.verifyElementDisplayedByText(
            "Last 30 days",
            "'Last 30 days' is not displayed"
        );
        //Select action
        await io.assert.verifyElementDisplayedByText(
            "Select action",
            "'Select action' is not displayed"
        );
        //Select source
        await io.assert.verifyElementDisplayedByText(
            "Select source",
            "'Select source' is not displayed"
        );
        //Select user
        await io.assert.verifyElementDisplayedByText(
            "Select user",
            "'Select user' is not displayed"
        );
        //Select resource type
        await io.assert.verifyElementDisplayedByText(
            "Select resource type",
            "'Select resource type' is not displayed"
        );


        //Data loader page
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Data loader");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
        await io.homePage.loadingTime();
        await page.getByText("Last 30 days").waitFor({ state: "visible", timeout: 360000 });

        //Last 30 days
        await io.assert.verifyElementDisplayedByText(
            "Last 30 days",
            "'Last 30 days' is not displayed"
        );
        //Select action
        await io.assert.verifyElementDisplayedByText(
            "Select action",
            "'Select action' is not displayed"
        );
        //Select source
        await io.assert.verifyElementDisplayedByText(
            "Select source",
            "'Select source' is not displayed"
        );
        //Select user
        await io.assert.verifyElementDisplayedByText(
            "Select user",
            "'Select user' is not displayed"
        );
        //Select resource type
        await io.assert.verifyElementDisplayedByText(
            "Select resource type",
            "'Select resource type' is not displayed"
        );

    });
});