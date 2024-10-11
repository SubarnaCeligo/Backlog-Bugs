import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111321 from '../../testData/inputData/FlowDebugger/C111321.json';


test.describe("C111397, C111313, C111314, C111318, C111396, C111316, C111399, C110855 verify items populate under 'path to many' if there are array fields in the resource", () => {
    test("@Env-All @Zephyr-IO-T14365 111397, C111313, C111314, C111318, C111396, C111316, C111399, C110855 verify items populate under 'path to many' if there are  array fields in the resource", async ({io, page},testInfo) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111321, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
        await page.getByRole('menuitem', { name: 'Add destination / lookup' }).click();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        //await page.pause();
        await io.flowBuilder.clickByText(
            "Look up additional records (per record)"
          );
          await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
          await io.homePage.loadingTime()
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.importsPage.selectConnectionDropDown(page,"3PL CONNECTION");

        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test IO-34461");
        await io.importsPage.clickByText("Yes (advanced)");
        await io.importsPage.waitForElementAttached(selectors.flowBuilderPagePO.ONE_TO_MANY);
        await io.importsPage.click(selectors.flowBuilderPagePO.ONE_TO_MANY);

        let pathToManyOptions;
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
        pathToManyOptions = (await page.$$(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS));
        //no. of array fields in export json resource matching in import
        await test.step("C110855 ", async () => {
            expect(pathToManyOptions.length).toEqual(2);
        });

        await test.step("C111396, C111399, C111397", async () => {
            const option = await io.homePage.clickByText("user.items");
            await io.homePage.loadingTime();
            await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.ONE_TO_MANY, 'value', 'user.items');
        });

        await test.step("C111316, C111314, C111318, C111313 ", async () => {
            await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.fill(selectors.flowBuilderPagePO.ONE_TO_MANY, 'random');
            await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.ONE_TO_MANY, 'value', 'random');
        });

    });

});