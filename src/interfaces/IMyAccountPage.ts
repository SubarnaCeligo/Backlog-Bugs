export interface IMyAccountPage {
  getElement(element): Promise<void>;
  navigateToMyAccount():Promise<void>;
}