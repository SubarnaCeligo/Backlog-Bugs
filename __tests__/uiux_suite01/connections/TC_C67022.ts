import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C67022 To verify that the Dialogue/Iframe is displayed when there is no matching for searched connection name in the connections page", () => {
    test("@Env-All C67022 To verify that the Dialogue/Iframe is displayed when there is no matching for searched connection name in the connections page", async ({io, page}) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'invalid_connection');
        await io.assert.verifyElementDisplayedByText(`We weren't able to find "invalid_connection"`, 'Dialogue/iframe not displayed.');
        await io.assert.verifyElementContainsText(`${selectors.basePagePO.APPLICATION} h6`, `Try usingHTTPconnector.`)
    });
  });