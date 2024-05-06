import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe( "Verify the email notifications received when SSO Client has been modified.", () => {
    test("@Env-QA @Env-STAGING Verify the email notifications received when SSO Client has been modified.", async ({ io, page, context }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);        
        await io.homePage.addStep("*** Navigated to Accounts page ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY)
        await io.homePage.addStep("*** Opened the the Security Tab ***");
        await io.myAccountPage.click(selectors.myAccountPagePO.SSO);
        await io.homePage.addStep("*** Opened the SSO tab ***");

        const isEnabled = await page.$eval(selectors.basePagePO.ENABLESSO, (element) => element.hasAttribute("Mui-disable"));
        console.log("true or false "+isEnabled);
        if(isEnabled==false)
        {
            // enable is true
            await io.myAccountPage.click(selectors.basePagePO.ENABLESSO);
        }

        await io.flowBuilder.click(selectors.basePagePO.ISSUERURL);
        await io.flowBuilder.fill(selectors.basePagePO.ISSUERURLINPUT,"abc");
        await io.flowBuilder.click(selectors.basePagePO.CLIENTID);
        await io.flowBuilder.fill(selectors.basePagePO.CLIENTIDINPUT,"123");
        await io.flowBuilder.click(selectors.basePagePO.CLIENTSECRET);
        await io.flowBuilder.fill(selectors.basePagePO.CLIENTSECRETINPUT,"123");
        await io.flowBuilder.click(selectors.basePagePO.ORGID);
        await io.flowBuilder.fill(selectors.basePagePO.ORGIDPINPUT,"abc12");
        await io.homePage.loadingTime();
        await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);

        let validateKeywords=await io.emailVal.validateKeywordsInMail(
            "[integrator.io] SSO setting has been modified", ['to see the latest SSO configuration'],"pwqa1",
          );
        expect(validateKeywords).toBeTruthy();
    });
  }
);