
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C53147_C53074", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C53147_C53074 @Env-All @Zephyr-IO-T14580 @Zephyr-IO-T14562", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on myAccount Menu ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    test.step("*** Clicked on Subscription Tab ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.assert.verifyElementDisplayedByText("Data retention up to 180 days", "Data retention up to 180 days is not displayed");
    expect(await ( await page.locator("//span[contains(text(),'Data retention up to 180 days')]/parent::li/*[@aria-hidden='true']")
      ).isVisible()
    ).toBeFalsy();
    test.step("*** Data retention upto 180 days without tick mark is displayed for premium account ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION);
    test.step("*** Clicked on Data Retention Tab ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "More options available");
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "Upgrade your account for longer data retention periods");
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "Request upgrade");

    const isDataRetentionRequestUpgradeAvailable = await io.homePage.isVisible(selectors.myAccountPagePO.DATARETENTIONREQUESTUPGRADE);
    await io.assert.expectToBeTrue(isDataRetentionRequestUpgradeAvailable, "Request Upgrade button is not visible");
    test.step("*** Info Banner is being displayed of the user is not of Enterprise tier ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);
    await io.homePage.loadingTime();

    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.THIRTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.SIXTY_DAYS);
    await io.assert.verifyElementToBeClickable(selectors.myAccountPagePO.NINETY_DAYS);
    await io.assert.verifyElementHasAttribute(selectors.myAccountPagePO.ONEEIGHTY_DAYS, "aria-disabled");
    test.step("*** Only 30,60 and 90 are enabled and 180 is disabled ***", async ()=>{});

    await io.homePage.isPageReady();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
