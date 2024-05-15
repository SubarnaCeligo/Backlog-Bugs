import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C106997_C106995_C106996 Validate that the sort dropdwon when specific column(Message, Code, Source, Classification) is selected', () => {


  test('C106997_C106995_C106996 Validate that user is able to sort dropdwon when specific column(Message, Code, Source, Classification) is selected', async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime()
    await io.flowBuilder.clickByText('TC_ C106997_DND');
    await io.flowBuilder.clickByTextByIndex("10 errors", 1);
    await io.flowBuilder.clickByTextByIndex("Timestamp", 0);
    await io.flowBuilder.clickByTextByIndex("Message", 1);

    // For Message
    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).first().innerText();
      await io.assert.expectToBeTrue(curString === '{"error":"InvalidEndpoint","description":"Not found"}', 'The list is not sorted according to Ascending order in Message');
    }

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).first().innerText();
      await io.assert.expectToBeTrue(curString === 'hello: Number must be 0 or 1', 'The list is not sorted according to Ascending order in Message');
    }
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.UP_ARROW
    );

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).first().innerText();
      await io.assert.expectToBeTrue(curString === '{"error":"InvalidEndpoint","description":"Not found"}', 'The list is not sorted according to Descending order in Message');
    }

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).first().innerText();
      await io.assert.expectToBeTrue(curString === 'hello: Number must be 0 or 1', 'The list is not sorted according to Descending order in Message');
    }

    // For Source
    await io.flowBuilder.clickByTextByIndex("Message", 0);
    await io.flowBuilder.clickByTextByIndex("Source", 1);

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(3).innerText();
      await io.assert.expectToBeTrue(curString === 'HTTP', 'The list is not sorted according to Ascending order in Source');
    }

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(3).innerText();
      await io.assert.expectToBeTrue(curString === 'Mapping', 'The list is not sorted according to Ascending order in Source');
    }
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.UP_ARROW
    );

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(3).innerText();
      await io.assert.expectToBeTrue(curString === 'HTTP', 'The list is not sorted according to Descending order in Source');
    }

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(3).innerText();
      await io.assert.expectToBeTrue(curString === 'Mapping', 'The list is not sorted according to Descending order in Source');
    }

    // For Code
    await io.flowBuilder.clickByTextByIndex("Source", 0);
    await io.flowBuilder.clickByTextByIndex("Code", 1);

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(2).innerText();
      await io.assert.expectToBeTrue(curString === '404', 'The list is not sorted according to Ascending order in Code');
    }

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(2).innerText();
      await io.assert.expectToBeTrue(curString === 'incompatible_datatype', 'The list is not sorted according to Ascending order in Code');
    }
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.UP_ARROW
    );

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(2).innerText();
      await io.assert.expectToBeTrue(curString === '404', 'The list is not sorted according to Descending order in Code');
    }

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(2).innerText();
      await io.assert.expectToBeTrue(curString === 'incompatible_datatype', 'The list is not sorted according to Descending order in Code');
    }

    // For Classification
    await io.flowBuilder.clickByTextByIndex("Code", 0);
    await io.flowBuilder.clickByTextByIndex("Classification", 1);

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(4).innerText();
      await io.assert.expectToBeTrue(curString === '', 'The list is not sorted according to Ascending order in Classification');
    }

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(4).innerText();
      await io.assert.expectToBeTrue(curString === 'Missing', 'The list is not sorted according to Ascending order in Classification');
    }
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.UP_ARROW
    );

    for (let i = 6; i <= 10; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(4).innerText();
      await io.assert.expectToBeTrue(curString === '', 'The list is not sorted according to Descending order in Classification');
    }

    for (let i = 1; i <= 5; i++) {
      let curString = await page.locator(`tr:nth-child(${i}) > td > div > div`).nth(4).innerText();
      await io.assert.expectToBeTrue(curString === 'Missing', 'The list is not sorted according to Descending order in Classification');
    }
  });
});
