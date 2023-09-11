import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22352 Verify UX for download integration dropdown field", () => {
    test("C22352 Verify UX for download integration dropdown field", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        await io.homePage.click(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU);
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.CLONE_INTEGRATION,"Clone Integration is not visible");
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.GENERATE_TEMPLATE_ZIP,"Template Zip is not visible");
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DELETE_INTEGRATION,"Delete Integration is not visible");
    });
});
