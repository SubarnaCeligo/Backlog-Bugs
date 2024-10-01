import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T38511 @Zephyr-IO-T38513 @Zephyr-IO-T38514 @Zephyr-IO-T38517 @Zephyr-IO-T38518 @Zephyr-IO-T38520'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @crossbrowser @Zephyr-IO-T38511 @Zephyr-IO-T38513 @Zephyr-IO-T38514 @Zephyr-IO-T38517 @Zephyr-IO-T38518 @Zephyr-IO-T38520'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.homePage.loadingTime();

        //IO-T38511 Verify new field added on Audit log page to filter Audit log with dates
        await io.assert.verifyElementIsDisplayed(
            selectors.homePagePO.AUDIT_FILTER,
            "Element is not displayed properly"
        );
        //IO-T38513 Verify The default value of the time filter should be set to “Last 30 days”
        await io.assert.verifyElementDisplayedByText(
            "Last 30 days",
            "'Last 30 days' is not displayed"
        );


        //IO-T38518 Verify user should be able to add/remove filter
        const result = (await io.flowBuilder.getText('[role="group"] > div > div > span')).toString();
        await io.homePage.clickByText(
            'Last 30 days'
        );
        await io.homePage.loadingTime();
        await io.homePage.clickByText(
            'Last hour'
        );
        await io.homePage.clickByText(
            'Apply'
        );
        await io.homePage.loadingTime();
        await io.homePage.delay(30000);
        const result1 = (await io.flowBuilder.getText('[role="group"] > div > div > span')).toString();
        await io.homePage.clickByText(
            'Last hour'
        );
        await io.homePage.clickByText(
            'Last 30 days'
        );

        await io.homePage.clickByText(
            'Apply'
        );
        await io.assert.verifyElementText(selectors.homePagePO.AUDIT_FILTER, "Last 30 days");


        //IO-T38514 Verify Date filter filtering Audit log properly
        expect(result).not.toEqual(result1);



        //IO-T38517 Verify after clicking Custom date range calender should open
        await io.homePage.clickByText(
            'Last 30 days'
        );
        await io.homePage.clickByText(
            'Custom'
        );

        await io.assert.verifyElementIsDisplayed(
            ".rdrDateDisplay",
            "Calender is not displayed properly"
        );
        await io.homePage.clickByText(
            'Apply'
        );
        await io.flowBuilder.loadingTime();

    });
});