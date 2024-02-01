
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C23151_TC_C27444_installing_and_verification.json";

test.describe("TC_C32359_TC_C32360_TC_C32361_TC_C32363", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C32359_TC_C32360_TC_C32361_TC_C32363", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(`${process.env['IO_UI_CONNECTOR_URL']}/marketplace/adp/${conn.ids.staging}/preview/`);

    await io.homePage.click(selectors.basePagePO.INSTALLBUTTONTEMPLATE);


    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.click(selectors.basePagePO.ONANDOFFBOARDINGINTEGRATION);
    await io.homePage.click(selectors.basePagePO.ONANDOFFBOARDINGAPPS);
    await io.homePage.click(selectors.basePagePO.NETSUITEAPP);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ONANDOFFBOARDINGFTP, 1);
    await io.homePage.click(selectors.basePagePO.SUBMITBUTTONTEMPLATE);

    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.click("[data-test='existing']");

    var ftp_id = conn.ftp.qa;
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, ftp_id);

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.templatePagePO.CONFIGURE);

    await io.homePage.click("[data-test='existing']");

    var ns_id = conn.netsuite.qa;
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, ns_id);

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageLoaded();

    var intId;

    intId = await io.api.getIntegrationId("Onboarding, Offboarding, and Payroll Business Process Automation for ADP");
    // else intId = await io.api.getIntegrationId("Hire to Retire for ADP");

    await io.homePage.click(selectors.flowBuilderPagePO.CLICKONFLOW);
    var PP_Length;
    PP_Length = await io.homePage.getLengthOfElementArray(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
    await io.assert.expectToBeValue(String(PP_Length), "1", "");

    // var closeButton = await page.$$(selectors.basePagePO.CLOSEFLOW);

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSEFLOW, 4);

    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);
    await io.homePage.fillWebPage(selectors.basePagePO.SELECTAPPFROMDROPDOWN, "netsuite");
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);

    await io.homePage.click(selectors.integrationPagePO.USERSTAB);

    await io.homePage.click(selectors.flowBuilderPagePO.CLICKONFLOW);

    var PP_Length1 = await io.homePage.getLengthOfElementArray(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
    await io.assert.expectToBeValue(String(PP_Length1), "2", "");
    await io.api.deleteIntegration(intId);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
