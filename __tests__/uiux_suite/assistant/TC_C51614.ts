import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";



test.describe(' C51614 Verify the name field under lookups', () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
  
test(' Verify the name field under lookups', async({io,page}) => {

    await io.flowBuilder.click(selectors.basePagePO.TOOLS)
    await io.flowBuilder.clickByText("Flow builder")

      await io.flowBuilder.click('[data-test="addProcessor"]')
      await io.flowBuilder.click('[data-test="JazzHR"]')

      await page.getByRole("menuitem").nth(2).click();
      await io.flowBuilder.click('#connections-dropdown')
      await io.flowBuilder.clickByText('JAZZHR CONNECTION')
      await io.flowBuilder.clickByText("Next");

        const divSelector = '#name'; // Selector for the <div> element
const divTextContent = await page.textContent(divSelector);

await io.assert.verifyElementContainsText('#name',"Name your lookup")


  });
});