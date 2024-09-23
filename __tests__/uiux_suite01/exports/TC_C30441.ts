import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";
import * as NS_FTP from "@testData/Flows/TC_C107885.json"

test.describe("TC_C30441_For an export or import with its connection offline, Verified that ,upon opening the export or import,Connection is offline message is displayed", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Env-All @Zephyr-IO-T2210 TC_C30441_For an export or import with its connection offline, Verified that ,upon opening the export or import,Connection is offline message is displayed UI_Backlog", async ({ io, page }, testInfo) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, NS_FTP);
        })
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        // Validating connection offline error message
        await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "The connection associated with this resource is currently offline and configuration is limited.")
    });
});