import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber,traverseThroughoutArrayToCheck} from "@celigo/aut-utilities";


test.describe("TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5984 @Zephyr-IO-T5985 @Zephyr-IO-T5986 @Zephyr-IO-T5987 @Zephyr-IO-T5988 @Zephyr-IO-T5989 @Env-All  TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Templates");
    test.step("Clicked templates button", async ()=>{});
    await io.homePage.loadingTime();

    expect(await ( await page.locator(selectors.flowBuilderPagePO.SEARCHBARFILTER)
      ).getAttribute("aria-label")
    ).toEqual("Search…");

    var createTemplate_loc = selectors.homePagePO.CREATETEMPLATE;
    expect(await io.homePage.isVisible(createTemplate_loc)).toBe(true);
    expect(await io.homePage.getText(createTemplate_loc)).toEqual("Create template");

    var templateTableHeading = await page.$$(
      selectors.basePagePO.TEMPLATETABLEHEADING
    );
    var templateTableHeadingSingle = 
      selectors.basePagePO.TEMPLATETABLEHEADING
    var temp = await selectors.basePagePO.TEMPLATETABLEHEADING;

    var templatesTableElements = [
      "Applications",
      "Name",
      "Last updated",
      "Website URL",
      "Published",
      "Actions",
    ];
    for(var i = 0; i < templatesTableElements.length; i++) {
     const text= await io.homePage.isVisible(`text= ${templatesTableElements[i]}`);
     await expect(text).toBe(true);
    }
    await io.homePage.click(selectors.homePagePO.CREATETEMPLATE);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007");
    await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input").nth(0)
    ).fill("15Five");
    await io.homePage.clearTextValue(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
    await io.homePage.keyboard("Enter");
    const nameVar = await io.homePage.isVisible('text="Name"')
    await io.assert.expectToBeValue(nameVar.toString(), "true", "");
     
    var templateForm = [
      "Name",
      "Description",
      "Applications",
      "Contact emails",
      "Website URL",
    ];
     var count = 0;
    for(var i = 0; i < templateForm.length; i++) {
      const text= await io.homePage.isVisible(`text= ${templateForm[i]}`);
      await expect(text).toBe(true);
      count++;
     }
     
    
    await io.assert.expectToBeValue(String(count), "5", "");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    if(await io.homePage.isVisible('text="A document already exists. Please contact celigo support for further assistance."')) {
      await io.homePage.click('[data-test="cancel"]');
      await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);  
    }

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007");
    await io.homePage.loadingTime();
    await page.getByText("TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007").click();
    var count = 0;
    for(var i = 0; i < templateForm.length; i++) {
      const text= await io.homePage.isVisible(`text= ${templateForm[i]}`);
      await expect(text).toBe(true);
      count++;
     }
     
 
    await io.assert.expectToBeValue(String(count), "5", "");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C23000_TC_C23002_TC_C23004_TC_C23005_TC_C23006_TC_C23007");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex('[role="switch"]', 0);

    const text= await io.homePage.isVisible("text='Publish'")
    await expect(text).toBe(true);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
