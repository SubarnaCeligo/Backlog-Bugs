import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./C1582.json";
 

test.describe(`C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, () => {

   
  test(`C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, async ({
    page,
    io
  }) => {
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData,
       
    );
    await io.assert.expectToBeValue(res.errors[0].message,'Cannot transfer account ownership to selected user as he is part of multiple organizations.',"message doesn't match")
  });
});
