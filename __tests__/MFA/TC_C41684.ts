import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C41684 verify empty state messaging for existing user", () => {
    test("@Env-All @Zephyr-IO-T897 Imports page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        const noImportText = await io.homePage.isVisible("text='You don’t have any imports'");
        const importsText = await io.homePage.isVisible("text='Imports are used to insert data into an application. See all of your imports at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noImportText, "No import message not shown");
        await io.assert.expectToBeTrue(importsText, "Imports text not shown");
    });
    test("@Env-All @Zephyr-IO-T897 Exports page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        const noExportText = await io.homePage.isVisible("text='You don’t have any exports'");
        const exportsText = await io.homePage.isVisible("text='Exports are used to receive or extract data from an application. See all of your exports at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noExportText, "No export message not shown");
        await io.assert.expectToBeTrue(exportsText, "Exports text not shown");
    });
    test("@Env-All @Zephyr-IO-T897 Agents page check", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Agents");
        const noAgentsText = await io.homePage.isVisible("text='You don’t have any agents'");
        const agentsText = await io.homePage.isVisible("text='Agents are software programs that run on your server and establishes a secure tunnel for connecting to integrator.io. See all of your agents at a glance, determine where they’re being used, and make edits on this page.'");
        await io.assert.expectToBeTrue(noAgentsText, "No Agents message not shown");
        await io.assert.expectToBeTrue(agentsText, "Agentss text not shown");
    });
  });