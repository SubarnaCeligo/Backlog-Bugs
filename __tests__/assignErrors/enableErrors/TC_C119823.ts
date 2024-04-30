import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C119823", () => {
    test("@Env-All @Zephyr-IO-T20110 TC_C119823", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
        await io.homePage.clickByText("Automation Flows")
        await io.myAccountPage.click(selectors.integrationPagePO.USERSTAB);
        await io.homePage.clickByText("Invite user");
        await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST,"user do not exist");
        });
    });