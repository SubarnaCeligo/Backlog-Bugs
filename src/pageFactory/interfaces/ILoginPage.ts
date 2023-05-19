export interface ILoginPage {
  navigateToLoginPage(): Promise<void>;
  login():Promise<void>;
}