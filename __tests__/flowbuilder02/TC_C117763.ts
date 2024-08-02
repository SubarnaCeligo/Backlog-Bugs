//***Commenting this test case as the feature has been reverted back */

import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117763", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.skip("@Epic-IO-34019 @Env-All @Priority-P2 @Zephyr-IO-T24304 C117763", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_SOURCE
        );

        await io.flowBuilder.clickByText("MariaDB");
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.clickByText("Use existing export");
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.selectDropDownWithSplChar("MariaDB");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);

        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);


        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Pre save page  script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
        await io.flowBuilder.selectTextfromDropDown(page, "preSavePage");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPAND_WINDOW_HOOKS);
       

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.VERIFY_STUB ,"*   '_parentJobId': the _parentJobId of the current running flow.",
            30);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_CONTENT);

        await io.flowBuilder.clickByText("Save & close");

        await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.VERIFY_FUNCTION_INPUT, '_parentJobId'
        );


    });
});

