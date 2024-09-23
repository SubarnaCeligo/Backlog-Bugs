import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import LicesnsePayload from "../../testData/inputData/STANDALONE/LicensePayload.json";

test.describe("TC_C53029_Verify_Data_Retention_Tab", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    const endPoint = 'v1/accountSettings';
    const payload = { dataRetentionPeriod: 30 };
    await io.api.patchCall(endPoint, payload);
    await io.homePage.loadingTime();
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    // Update data retention period to endpoint
    const endPoint = 'v1/accountSettings';
    const payload = { dataRetentionPeriod: 30 };
    await io.api.patchCall(endPoint, payload);
    await io.homePage.loadingTime();

    //get licensce ID
    const licenses = await io.api.getCall('v1/licenses');
    const payload2 = LicesnsePayload;
    const licenseID = licenses[0]._id;

    // Update license to platform
    const endPoint2 = 'v1/test/licenses/' + licenseID;
    payload2.maxAllowedDataRetention = 90;
    await io.api.putCall(endPoint2, payload2);
  });

  test("TC_C53029_C53065_C53064_C53066_C53067_C53068_C53077_C53076_Verify_Data_Retention_Tab @Env-All @Zephyr-IO-T14550 @Zephyr-IO-T14553 @Zephyr-IO-T14555 @Zephyr-IO-T14556 @Zephyr-IO-T14557 @Zephyr-IO-T14563 @Zephyr-IO-T14560", async ({ io, page }, testInfo) => {
    //get licensce ID
    const licenses = await io.api.getCall('v1/licenses');
    const payload = LicesnsePayload;
    const licenseID = licenses[0]._id;

    // Update license to platform
    const endPoint = 'v1/test/licenses/' + licenseID;
    payload.maxAllowedDataRetention = 180;
    await io.api.putCall(endPoint, payload);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION);
    test.step("*** Clicked on Data Retention Tab ***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);


    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.THIRTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.SIXTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.NINETY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.ONEEIGHTY_DAYS);
    await test.step("*** Only 30, 60, 90 and 180 are enabled ***", async () => { });

    // Update license to platform
    payload.maxAllowedDataRetention = 90;
    await io.api.putCall(endPoint, payload);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION);
    test.step("*** Clicked on Data Retention Tab ***", async ()=>{});

    const isDataRetentionRequestUpgradeAvailable = await io.homePage.isVisible(selectors.myAccountPagePO.DATARETENTIONREQUESTUPGRADE);
    await io.assert.expectToBeTrue(isDataRetentionRequestUpgradeAvailable, "Request Upgrade button is not visible");
    test.step("*** Info Banner is not being displayed if user is of Enterprise tier ***", async () => { });

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "More options available");
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "Upgrade your account for longer data retention periods");
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "Request upgrade");

    const isPageInfoAvailable = await io.homePage.isVisible(selectors.basePagePO.TOOLTIP);
    await io.assert.expectToBeTrue(isPageInfoAvailable, "Page info icon is not displayed");
    await io.homePage.click(selectors.basePagePO.TOOLTIP);
    await io.homePage.loadingTime();
    var PageinfoText = await io.homePage.getText(selectors.myAccountPagePO.DATARETENTIONTOOLTIP);
    const pageInfo = "If you’re an account owner or administrator, you can access your integrator.io data for 30 or more days. The data retention period varies based on your Celigo license, which you can upgrade anytime. You can also delete these records. This functionality is compliant with GDPR and CCPA rules.";
    await io.assert.expectToContainValue(pageInfo, String(PageinfoText), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
    await io.homePage.loadingTime();
    const fieldText = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    const helpText = "Select the number of days to store data.  Changing the retention period will apply to new data only. Data retained before a retention period change will continue to expire based on the retention period defined at the time of retention.Learn more about data retention.";
    await io.assert.expectToContainValue(helpText, String(fieldText), "");

    test.step("*** Page help text and field help text is getting displayed as expected ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);

    const thirtydays = await page.locator(
      selectors.myAccountPagePO.THIRTY_DAYS
    );
    const sixtydays = await page.locator(
      selectors.myAccountPagePO.SIXTY_DAYS
    );

    await io.homePage.loadingTime();
    const selected = await thirtydays.getAttribute("aria-selected");
    await io.assert.expectToBeValue(selected, "true","");
    test.step("*** 30 days is selected by default for Data retention ***", async ()=>{});

    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.THIRTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.SIXTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.NINETY_DAYS);
    await io.assert.verifyElementHasAttribute(selectors.myAccountPagePO.ONEEIGHTY_DAYS, "aria-disabled");
    await test.step("*** Only 30,60 and 90 are enabled and 180 is disabled ***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.SIXTY_DAYS);
    await io.homePage.loadingTime();

    const isWarningMessageVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.LAST_SAVED);
    await io.assert.expectToBeTrue(isWarningMessageVisible, "");
    const warningMessage = await io.homePage.getText(selectors.flowBuilderPagePO.LAST_SAVED);
    const expectedWarningMessage = "Learn more about data retention and consult with your security/privacy team before saving a new retention period.";
    await io.assert.expectToContainValue(expectedWarningMessage, String(warningMessage), "");

    test.step("*** Warning message is displayed when we select data retention period to change ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();

    const isDialogBoxVisible = await io.homePage.isVisible(selectors.myAccountPagePO.DIALOG_BOX);
    await io.assert.expectToBeTrue(isDialogBoxVisible, "");
    const dialogBoxText = await page.locator(selectors.myAccountPagePO.DIALOG_BOX).textContent();
    const expectedDialogBoxText = "Changing the retention period will apply to new data only. Data retained before this retention period change will continue to expire based on the retention period defined at the time of retention.";
    await io.assert.expectToContainValue(expectedDialogBoxText, String(dialogBoxText), "");
    test.step("*** Confirmation dialog box is displayed as expected if we save the new data retention period ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.CONFIRM_DATA_RETENTION_CANCEL);
    await io.homePage.loadingTime();
    const dialogClosecheck = await io.homePage.isVisible(selectors.myAccountPagePO.DIALOG_BOX);
    await io.assert.expectToBeFalse(dialogClosecheck, "");
    test.step("*** Clicking on cancel closes the dialog box ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.CONFIRM_DATA_RETENTION_SAVE);
    const notification = await page.locator(selectors.basePagePO.NOTIFICATION_ID).nth(1);
    await notification.waitFor({ state: "visible", timeout: 10000 });

    await io.assert.verifyElementTextByIndex(selectors.basePagePO.NOTIFICATION_ID, "New data retention period successfully saved.", 1);

    test.step("*** Successful message is shown once the new data retention period is saved ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);
    await io.homePage.loadingTime();

    const selectedafterSave = await sixtydays.getAttribute("aria-selected");
    await io.assert.expectToBeValue(selectedafterSave,"true", "");
    test.step("*** 60 days is selected test.afterEach the update ***", async () => { });
    await io.homePage.click(selectors.myAccountPagePO.THIRTY_DAYS);
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.click(selectors.myAccountPagePO.CONFIRM_DATA_RETENTION_SAVE);

    await io.homePage.isPageReady();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
