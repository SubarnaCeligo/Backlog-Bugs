import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./C1582.json";
 

test.describe(`C2255_C2288_C2290_C2284_C2289_C2291_C2445 Transfer Account Ownership between users`, () => {

   
  test(` Transfer Account Ownership between users`, async ({
    page,
    io
  }) => {
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData,
       
    );
    console.log(res.errors[0].message,"res");
    await expect(res.errors[0].message).toBe('Cannot transfer account ownership to selected user as he is part of multiple organizations.');

  });
});
