import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.only('Verify the default output selection must be rows for CSV', () => {
    test.beforeEach(async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await  io.homePage.waitForElementAttached('input[type="checkbox"].PrivateSwitchBase-input');

  // Click the checkbox
  await io.homePage.click('input[type="checkbox"].PrivateSwitchBase-input');

  await io.homePage.clickByText("Continue")
    });
  
    test('Verify the default output selection must be rows for CSV', async({io,page}) => {

        // await io.homePage.waitForElementAttached("[text='Tools']")
    
        await io.homePage.clickByText("Tools")
        await io.homePage.clickByText("Flow builder")
        await io.homePage.clickByText("Add source")
        await io.flowBuilder.click("[data-test='Zendesk Support']") 
        await io.flowBuilder.click("#connections-dropdown") 
        await io.flowBuilder.clickByText("Create connection") 

        await io.flowBuilder.click("input[name='/name']")

        await io.flowBuilder.fill("input[name='/name']", 'zendesk supprt')

        await io.flowBuilder.click("input[name='/http/zendeskSubdomain']")
        await io.flowBuilder.fill("input[name='/http/zendeskSubdomain']", "celigoqa")
        await io.flowBuilder.click("input[name='/http/auth/basic/username']")
        await io.flowBuilder.fill("input[name='/http/auth/basic/username']", "mounica.manavapati@celigo.com")
        await io.flowBuilder.click("input[name='/http/auth/basic/password']")
        await io.flowBuilder.fill("input[name='/http/auth/basic/password']", "celigo1234")

        await io.flowBuilder.clickByText("Save");

 
await page.locator('[data-test="cancel"]').first().click();

await 

   await io.flowBuilder.clickByText("Next");

   await io.flowBuilder.fill("input[name='/name']", 'zendesk supprt')

   await io.flowBuilder.click('id=mui-component-select-/assistantMetadata/resource')

   await io.flowBuilder.clickByText("Tickets")

   await io.flowBuilder.click('id=mui-component-select-/assistantMetadata/operation');

   await io.flowBuilder.clickByText("List Tickets")


   await io.flowBuilder.clickByText("Save & close")



       
    });
  })
