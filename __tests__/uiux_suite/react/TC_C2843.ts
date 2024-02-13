import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C2843 from '@testData/Flows/C2843.json';
import {
    isValidLocalTimeFormat,
    isRelativeTimeFormat
  } from "@celigo/aut-utilities";

test.describe("C2843 Verify default time shown in 'Automatic' for newly created flows is as per profile timezone.", () => {
    test("C2843 Verify default time shown in 'Automatic' for newly created flows is as per profile timezone", async ({io, page}) => {
       await io.createResourceFromAPI(C2843, 'FLOWS');
       await io.homePage.loadingTime();
       
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
   const time =  await page.$(selectors.flowBuilderPagePO.CHOOSETIME_DELTAFLOW_TIMESTAMP);
   await io.homePage.loadingTime();
  
   let valueAttribute = (await time.getAttribute('value')).toString();
   let ext=valueAttribute.match(/\d+/g)
  let hours=ext
   let currentTime = new Date().toLocaleTimeString();
   let currentHours = currentTime.split(':').map(component => component.trimStart());

   let result = false;
   let time1=hours[0].trim().replace(/\s/g, '')
   let time2=currentHours[0].trim().replace(/\s/g, '');

   await io.assert.expectToBeValue(time1,time2,"Not in local time");
   
      });
  });
   

   

 