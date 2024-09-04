import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1710", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test("@Zephyr-IO-T2231 @Env-All  TC_C1710", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.integrationPagePO.ADMINTAB);
    await io.homePage.click(selectors.flowBuilderPagePO.README);
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_README);
    await io.homePage.click(selectors.integrationPagePO.READMEEDITOR);
    await io.homePage.fillWebPage(selectors.integrationPagePO.READMEEDITOR, '<A HREF="http://www.yourdomain.com/">Visit Our Site</A><B>Example</B><BODY>The content of your page</BODY><H4>Heading 4 Example</H4><HEAD>Contains elements describing the document</HEAD><OL><LI>List item 1 <LI>List item 2</OL><FONT FACE="Times New Roman" SIZE="+2">Example</FONT><TABLE BORDER="2" CELLPADDING="1"  CELLSPACING="1" WIDTH="10%"><TR><TD>Column 1</TD></TR></TABLE>');
    let data1 = await page.locator(
      selectors.integrationPagePO.READMEDATA1
    ).isVisible();
    await await io.assert.expectToBeTrue(data1, "");
    let data2 = await page.locator(
      "//b[text()='Example']"
    ).isVisible();
    await await io.assert.expectToBeTrue(data2, "");
    let data3 = await page.locator(
      "//h4[text()='Heading 4 Example']"
    ).isVisible();
    await await io.assert.expectToBeTrue(data3, "");
    let data4 = await page.locator(
      "//li[text()='List item 1 ']"
    ).isVisible();
    await await io.assert.expectToBeTrue(data4, "");
    let data5 = await page.locator(
      "//font[text()='Example']"
    ).isVisible();
    await await io.assert.expectToBeTrue(data5, "");
    let data6 = await page.locator(
      "table>tbody>tr>td"
    ).isVisible();
    await await io.assert.expectToBeTrue(data6, "");
  });
});
