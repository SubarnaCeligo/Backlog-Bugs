import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connectionData from "@testData/Connections/Create/C58600_connection.json";
import iclientData from "@testData/Connections/C58600_iclient.json";

test.describe("TC_C58600Verify creating connection throws error with iClient having domain have different values than Auth URI, access token URI, revoke token url", () => {
    let iClientId;
    let connectionId;
    test.beforeEach(async ({ io }) => {
        await io.connections.deleteConnection(connectionData.name);
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
      });
    test("@Zephyr-IO-T16988 @Env-All C58600 Verify creating connection throws error with iClient having domain have different values than Auth URI, access token URI, revoke token url", async ({ io, page}, testInfo) => {
        iClientId = await io.api.postCall(`v1/iclients`, iclientData);
        connectionData.http._iClientId = iClientId._id;
        connectionId = await io.api.postCall(`v1/connections`, connectionData);
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.loadingTime();
        console.log(iClientId);
        console.log(connectionId);
        await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
        await io.homePage.loadingTime();
        await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
        await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
        await io.flowBuilder.clickByTextByIndex(connectionId.name, 0);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI, "https://celigo-returnly-staging.myshopify.com/admin/api123");
        const popupPromise = page.waitForEvent('popup');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        const popup = await popupPromise;
        let isErrorMessageDisplayed = await popup.locator(selectors.importPagePO.POP_UP).innerText();
        let expectedErrorMessage = "Sorry, but we were not able to successfully authenticate your connection.\n{\"code\":\"invalid_domain\",\"message\":\"The domain of request url should be present in iClient.oauth2.validDomainNames\",\"source\":\"resource\",\"resolved\":false";
        expect(isErrorMessageDisplayed).toContain(expectedErrorMessage);
    });
});
