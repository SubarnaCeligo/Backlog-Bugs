import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("C47952 Use this account for SSO dropdown in security tab should show Account names not the owner names", () => {
    test("C47952 Use this account for SSO dropdown in security tab should show Account names not the owner names", async ({io, page}) => {
       
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime();
        const company =  await page.$('[name="company"]');
        let companyvalue = (await company.getAttribute('value')).toString().toLowerCase();
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.clickByText("Please select");
 
        const ssodropdown =    (await io.myAccountPage.getText("[class='MuiBox-root css-xs9fqv']"));
        let result = false;

        if(companyvalue==ssodropdown[1].toString().toLowerCase())
        {
          result = true;
        }
         await io.assert.expectToBeTrue(result, "Not displaying company name.");
         
        });
        
    });
        

      

  