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
       
    await io.flowBuilder.click('[data-test="runFlow"]');
    await io.homePage.loadingTime();
   const time =  await page.$('[aria-label*="Choose time"]');
   await io.homePage.loadingTime();
  
   let valueAttribute = (await time.getAttribute('value')).toString();
   let ext=valueAttribute.match(/\d+/g)
  let hours=ext
   let currentTime = new Date().toLocaleTimeString();
   let currentHours = currentTime.split(':').map(component => component.trimStart());

   let result = false;
   let time1=hours[0].trim().replace(/\s/g, '')
   let time2=currentHours[0].trim().replace(/\s/g, '');

  if(time1==time2)
  {
    result = true;
  }
   await io.assert.expectToBeTrue(result, "Not in LocalTime")
    });
  });
   

   

 