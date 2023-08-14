import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify user with Manage access for an integration must able to create new flow,Data loader with registered connections', () => { 

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test('Verify user with Manage access for an integration must able to create new flow,Data loader with registered connections', async ({ io, page }) => {
        
      await io.myAccountPage.clickByText("Audit log");
      await io.myAccountPage.clickByText("Select user");

     await page.getByRole('option', { name: 'Harshita Rai' }).click();

     await io.myAccountPage.clickByText("Select resource type");

    const element =  await page.getByRole('option', { name: 'Flow' });

    expect(element).toBeTruthy();

    expect( await page.getByRole('option', { name: 'Export' })).toBeTruthy();
    expect( await page.getByRole('option', { name: 'Import' })).toBeTruthy();
    expect( await page.getByRole('option', { name: 'Connection' })).toBeTruthy();
    expect( await page.getByRole('option', { name: 'Integration' })).toBeTruthy();
        
      });       
  })