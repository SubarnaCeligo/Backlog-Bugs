
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Validation for the mandatory field should be highlighted during connection creation", () => {
  test("@Zephyr-IO-T24753 @Env-All @Epic-IO-86262 @Priority-P2 - Validation for the mandatory field should be highlighted during connection creation", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "iClients");
    await io.homePage.addStep("Reloading the page");
    await io.homePage.reloadPage();

    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLIENTCRED);
    await io.flowBuilder.click(selectors.connectionsPagePO.JWTENABLE);
    await io.flowBuilder.click(selectors.connectionsPagePO.JWTSIGNATURE);
    await io.connectionPage.selectTextfromDropDown(page, 'hmac-sha256');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);

    const errorMsg = (await io.exportsPage.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
    await io.assert.expectToContainValue('A value must be provided', errorMsg, "Error is not showing properly");

    const color = await page
      .locator(selectors.basePagePO.JWT_SECRET_LABEL)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).color;
      });
    
    await io.assert.expectToBeValue(
      "rgb(255, 60, 60)",
      color,
      "Red color not found"
    );
  
    await io.homePage.loadingTime();
  });
});

