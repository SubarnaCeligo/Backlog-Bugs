import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify signature fields are showing correctly as per signature method', ()=>{
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test('Verify signature fields are showing correctly as per signature method', async ({io, page}) =>{
        await io.homePage.clickByText('Resources')
        await io.homePage.clickByText('Connections')
        await io.connectionPage.clickByText('Create connection');

        await io.connectionPage.clickByText('Magento 2');

       

        await page.pause();
    })

})