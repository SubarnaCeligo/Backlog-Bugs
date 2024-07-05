import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Full drawer open on creating rest import", () => {
    test.describe.configure({ retries: 2 })
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-80315 @Priority-P2 @Env-All @Zephyr-IO-T32987", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.homePage.loadingTime()
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT,"GRAPHQL");
        await io.flowBuilder.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
        await io.flowBuilder.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C32987.png",{maxDiffPixelRatio: 0.2});
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'GRAPHQL CONNECTION');
        await io.flowBuilder.clickByText("GRAPHQL CONNECTION");
        await io.flowBuilder.loadingTime();
        expect(await page.screenshot()).toMatchSnapshot("TC_C32943_1.png",{maxDiffPixelRatio: 0.2});
    });
});