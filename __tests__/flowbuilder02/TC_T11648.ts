import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T11648 UX Sort and group", () => {
    test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T11648 @Env-All FTP Verify by expanding group and sort records field, the system automatically adds a new and empty Sort records by fields", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SORTANDGROUP);
        await io.flowBuilder.loadingTime();
        let sortField = await page.getByText("Sort records by fields");
        expect(await sortField.isVisible()).toBeTruthy();
        // test if Sort record field is above Advanced and below Transfer section 
        // const position1 = await page.evaluate((selectors) => {
        //     const sortElement = document.querySelector(selectors.flowBuilderPagePO.SORTANDGROUP);
        //     const advancedElement = document.querySelector(selectors.flowBuilderPagePO.ADVANCED);
        //     const transferElement = document.querySelector(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER); 
        //     // && ((sortElement as HTMLElement)?.offsetTop > (transferElement as HTMLElement)?.offsetTop)
        //     return (advancedElement as HTMLElement)?.offsetTop;
        //   }, selectors);
        // expect(position1).toBeTruthy();
        // const position = await page.evaluate((selectors) => {
        //     const sortElement = document.querySelector(selectors.flowBuilderPagePO.SORTANDGROUP);
        //     const advancedElement = document.querySelector(selectors.flowBuilderPagePO.ADVANCED);
        //     const transferElement = document.querySelector(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER); 
        //     // && ((sortElement as HTMLElement)?.offsetTop > (transferElement as HTMLElement)?.offsetTop)
        //     // return (sortElement as HTMLElement)?.offsetTop < (advancedElement as HTMLElement)?.offsetTop ? true : false;
        //     return (sortElement as HTMLElement)?.offsetTop;
        //   }, selectors);
        // expect(position).toBeTruthy();

        await page.waitForSelector(selectors.flowBuilderPagePO.SORTANDGROUP); 
        let sortElement = await page.$(selectors.flowBuilderPagePO.SORTANDGROUP);
        let sortPosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, sortElement);
      
        let advanceElement = await page.$(selectors.flowBuilderPagePO.ADVANCED);
        await advanceElement.scrollIntoViewIfNeeded();
        let advancePosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, advanceElement);
        expect(sortPosition).toBeLessThan(1000);
        expect(advancePosition).toBeLessThan(3);
    });
    // test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T11648 @Env-All S3 Verify by expanding group and sort records field, the system automatically adds a new and empty Sort records by fields", async ({ io, page }) => {
    //     await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    //     await io.homePage.loadingTime()
    //     await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    //     await io.homePage.loadingTime();
    //     await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    //     await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon S3');
    //     await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);
    //     await io.flowBuilder.loadingTime();
    //     await io.flowBuilder.clickByText('Create flow step');
    //     await io.flowBuilder.loadingTime();
    //     await io.flowBuilder.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    //     await io.flowBuilder.loadingTime();
    //     let sortField = await page.getByText("Sort records by fields")
    //     expect(await sortField.isVisible()).toBeTruthy();
    // });
    // test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T11648 @Env-All GDrive Verify by expanding group and sort records field, the system automatically adds a new and empty Sort records by fields", async ({ io, page }) => {
    //     await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    //     await io.homePage.loadingTime()
    //     await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    //     await io.homePage.loadingTime();
    //     await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    //     await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google Drive');
    //     await io.flowBuilder.clickByText('Google Drive');
    //     await io.flowBuilder.loadingTime();
    //     await io.flowBuilder.clickByText('Create flow step');
    //     await io.flowBuilder.loadingTime();
    //     await io.flowBuilder.click(selectors.flowBuilderPagePO.SORTANDGROUP);
    //     await io.flowBuilder.loadingTime();
    //     let sortField = await page.getByText("Sort records by fields")
    //     expect(await sortField.isVisible()).toBeTruthy();
    // });
});