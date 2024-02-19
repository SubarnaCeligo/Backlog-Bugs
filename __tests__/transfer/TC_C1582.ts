import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./C1582.json";
 

test.describe(`C1582 Verify,When two integrations have same connections, when trying to transfer one integration, it must provide a validation that the same connection is used in another integration`, () => {

   
  test(`C1582 Verify,When two integrations have same connections, when trying to transfer one integration, it must provide a validation that the same connection is used in another integration`, async ({
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
