import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify connections get filtered on basis of resources chosen for HTTP connectors while creating new flow step'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    });
    test("@Epic-IO-76152 @Priority-P2 @Env-All @Zephyr-IO-T32340 Verify connections get filtered on basis of resources chosen for HTTP connectors while creating new flow step'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();
        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "META");
        await io.flowBuilder.click(selectors.connectionsPagePO.META);
         await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        const facebook = await io.flowBuilder.isVisible("text='Facebook Ads'");
        await io.assert.expectToBeTrue(facebook, "Facebook connection is not displayed");
        const instagram = await io.flowBuilder.isVisible("text='Instagram Ads'");
        await io.assert.expectToBeTrue(instagram, "Instagram connection is not displayed");
        await io.flowBuilder.addStep("*** Verified Both facebook and instagram connections is displayed ***");
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.addStep("*** Selecting resource 'Ad account' and checking the connections in drop-down ***");
        await io.flowBuilder.clickByText("Ad account");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        const facebook1 = await io.flowBuilder.isVisible("text='Facebook Ads'");
        await io.assert.expectToBeTrue(facebook1, "Facebook connection is not displayed");
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.GET_ADS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        const instagram1 = await io.flowBuilder.isVisible("text='Instagram Ads'");
        await io.assert.expectToBeTrue(instagram1, "Instagram connection is not displayed");
    });
});