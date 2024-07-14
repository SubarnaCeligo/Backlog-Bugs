import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe( "C27017 Verify the email received when user who has sso enabled clicks on forgot password.", () => {
    test("@Zephyr-IO-T5101 @Env-All @Priority-P2 C27017 Verify the email received when user who has sso enabled clicks on forgot password.", async ({ io, page, context }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

        await io.homePage.loadingTime();
        await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
        await io.homePage.click(selectors.basePagePO.SUBMIT);
        
        await io.homePage.loadingTime();

        let iourl = new URL(process.env["IO_UI_CONNECTOR_URL"]);
        let validateKeywords = await io.emailVal.validateKeywordsInMail(
            "[" + iourl.host + "] Request to reset your password", ['Please click the following link to reset your'],"pwqa1");
        expect(validateKeywords).toBeTruthy();
    });
  }
);