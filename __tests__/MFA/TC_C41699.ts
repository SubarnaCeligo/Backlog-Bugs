import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C41699 Verify the empty state messaging after closing the create connection tab", () => {
    test("@Env-All @Zephyr-IO-T904 Imports page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CLOSE);
        const noImportText = await io.homePage.isVisible("text='You don’t have any imports'");
        const importsText = await io.homePage.isVisible("text='Imports are used to insert data into an application. See all of your imports at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noImportText, "No import message not shown");
        await io.assert.expectToBeTrue(importsText, "Imports text not shown");
    });
    test("@Env-All @Zephyr-IO-T904 Exports page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CLOSE);
        const noExportText = await io.homePage.isVisible("text='You don’t have any exports'");
        const exportsText = await io.homePage.isVisible("text='Exports are used to receive or extract data from an application. See all of your exports at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noExportText, "No export message not shown");
        await io.assert.expectToBeTrue(exportsText, "Exports text not shown");
    });
    test("@Env-All @Zephyr-IO-T904 Agents page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Agents");
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.homePage.click(selectors.basePagePO.CLOSE);
        const noAgentsText = await io.homePage.isVisible("text='You don’t have any agents'");
        const agentsText = await io.homePage.isVisible("text='Agents are software programs that run on your server and establishes a secure tunnel for connecting to integrator.io. See all of your agents at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noAgentsText, "No Agents message not shown");
        await io.assert.expectToBeTrue(agentsText, "Agentss text not shown");
    });
  });