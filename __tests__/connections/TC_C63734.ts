import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('Verify password is masked is or not', () => {
  test.beforeEach(async ({ io }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });

  test('Verify password is masked is or not', async ({io,page}) => {
    await io.connectionPage.clickByText('NETSUITE 706 CONNECTION');
    const passwordSelector  = selectors.importPagePO.PASSWORD;
    await page.type( passwordSelector, 'update123');
    const computedFont = await page.$eval(passwordSelector, (input) => {
     const styles = window.getComputedStyle(input);
     return styles.getPropertyValue('font');
   });
   expect(computedFont).not.toBe('normal');
 });
})


