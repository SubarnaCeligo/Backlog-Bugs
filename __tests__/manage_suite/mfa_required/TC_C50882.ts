import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./mfa.json";

test.describe(`C50882 Verify a shared user with MFA required and had set on the account and also MFA verified should be able to switch the accounts`, () => {
  test(`C50882 Verify a shared user with MFA required and had set on the account and also MFA verified should be able to switch the accounts`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
     
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
