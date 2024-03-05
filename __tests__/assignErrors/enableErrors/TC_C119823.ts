import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C119823", () => {
    test("TC_C119823", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
        await io.homePage.clickByText("Automation Flows")
        await io.myAccountPage.click(selectors.integrationPagePO.USERSTAB);
        await io.homePage.clickByText("Invite user");
        let check= '[data-test="assigneeNameInMenuList"]'

        await io.assert.verifyElementIsDisplayed(
            check,
            "user do not exist"
          )

        });
    });