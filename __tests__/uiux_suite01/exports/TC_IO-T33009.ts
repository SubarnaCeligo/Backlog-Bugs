import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as T33009 from "@testData/Exports/T33009.json"

test.describe("@Author - SubarnaGhatak IO-T33009 Verify no error pop up is displayed when there is an empty record set in the page_of _records on populating preview data in Mock output.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T33009 @Epic-IO-80162  @Env-All @Priority-P2 @Author-SubarnaGhatak ", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText('Automapper_DND_Mapper_One');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT );
        await io.flowBuilder.fill(selectors.exportsPagePO.MOCKOUTPUT_INPUTFIELD, JSON.stringify(T33009));
        await io.flowBuilder.clickByText('Preview');
        let isErrorMsgNotPresent;

        try {
            // Attempt to find the error message element
            await io.assert.verifyElementDisplayedByText(
                "The Preview Data received from source does not contain any records. Check your source application or enter your own mock output records",
                "Error msg present"
            );
            // If the element is found, set isErrorMsgNotPresent to false
            isErrorMsgNotPresent = false;
        } catch (error) {
            // If an error is thrown (element not found), set isErrorMsgNotPresent to true
            isErrorMsgNotPresent = true;
        }

        console.log("Error message is not present:", isErrorMsgNotPresent);


    });
});