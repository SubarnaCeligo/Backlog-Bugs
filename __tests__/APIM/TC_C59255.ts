import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe( "Help text for Token", () => {
    test("Help text for Token", async ({ io, page, context }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.API_TOKENS);
        await io.homePage.loadingTime();
        const helptext = await page.$$(selectors.flowBuilderPagePO.APIMAPITOKENHELPTEXT)
        await helptext[8].click();
        const value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        const expectedvalue = "This is a Celigo system generated access token for API management. This is a non-editable token, with scope set to “Custom” and auto-purge set to “Never”. It is intended to secure API calls to and from the integrator.io platform"
        const func = value.toString().includes(expectedvalue);
        await io.assert.expectToBeTrue(func, "help text doesn't match")
        await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.API_TOKENS);
        await io.homePage.loadingTime();
        const helptext1 = await page.$$(selectors.flowBuilderPagePO.APIMAPITOKENHELPTEXT)
        await helptext1[8].click();
        const Sandboxvalue = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        const Sandboxexpectedvalue = "This is a Celigo system generated access token for API management. This is a non-editable token, with scope set to “Custom” and auto-purge set to “Never”. It is intended to secure API calls to and from the integrator.io platform"
        const funcS = Sandboxvalue.toString().includes(Sandboxexpectedvalue);
        await io.assert.expectToBeTrue(funcS, "help text doesn't match")
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    });
  }
);
