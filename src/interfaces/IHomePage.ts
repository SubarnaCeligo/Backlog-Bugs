export interface IHomePage {
  createFlowButton;
  open(): Promise<void>;
  navigateToHome(): Promise<void>;
  goToIntegrationTile(): Promise<void>;
  goToPage(pageName: string): Promise<void>;
}