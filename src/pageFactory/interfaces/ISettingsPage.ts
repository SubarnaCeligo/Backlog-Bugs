export interface ISettingsPage {
  createFlowButton;
  goToFlowBuilder(): Promise<void>;
  selectTextFromDropDown(value: string):Promise<any>;
  eleAppSelection;
  selectApplication(appname: string):Promise<void>;
}