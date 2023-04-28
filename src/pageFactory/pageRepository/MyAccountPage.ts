import  { Page } from "@playwright/test";
import { WebActions } from "@lib/WebActions";
import { MyAccountPagePO } from "@objects/MyAccountPagePO";

let webActions: WebActions, myAccount: MyAccountPagePO;

export class MyAccountPage{
  private page: Page;

 constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
    myAccount = new MyAccountPagePO();
}

async getElement(ele){
return  await this.page.locator(myAccount[ele]);
}

async navigateToMyAccount(){
  await webActions.navigateTo(
    "https://qa.staging.integrator.io/myAccount/profile"
  );
}

}
