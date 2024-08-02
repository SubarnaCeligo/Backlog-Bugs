import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C29063 Verify the concurrency levels while cloning a flow.", () => {
  test("C29063 @Zephyr-IO-T29063  @Env-All @Priority-P2 Verify the concurrency levels while cloning a flow.", async ({
    io,
    page,
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), "concurrency": 12, "sandbox": false, "tier": "professional", "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
    );
    await io.homePage.reloadPage();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await page
      .locator(selectors.homePagePO.INTEGRATION_TILES)
      .filter({ hasText: "Automation_flows" })
      .last()
      .locator("button")
      .first()
      .click();
    
    await io.homePage.click(`tbody tr:has-text("Automation_DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.CLONE_FLOW_INTABLE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.INTEGRATION);
    await page.getByRole("menuitem").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.homePage.loadingTime();
    await io.templatePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.loadingTime();
    const elementSelector = selectors.importPagePO.ADVANCED;
    const element = await page.locator(elementSelector);
    await element.scrollIntoViewIfNeeded();
    await io.flowBuilder.click(elementSelector);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    const maxConcurrencyLevel = await io.connectionPage.selectTextfromDropDown(page, "12");
    expect(maxConcurrencyLevel).toBe(true);
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    await io.homePage.loadingTime();
    await io.connectionPage.clickByText("request an upgrade.");   
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
