export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginMenuButton = page.getByRole('link', { name: ' Signup / Login' });
    this.productsMenuButton = page.getByRole('link', { name: ' Products' });
    this.cartMenuButton = page.getByRole('link', { name: ' Cart' });
    this.contactUsMenuButton = page.getByRole('link', { name: ' Contact us' });
  }

  async navigate(path = '/') {
    await this.page.route('**/*google*', route => route.abort());
    await this.page.route('**/*doubleclick*', route => route.abort());
    await this.page.route('**/*adservices*', route => route.abort());
    
    await this.page.goto(path);
  }
}
