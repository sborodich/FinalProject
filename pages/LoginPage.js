// pages/LoginPage.js
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Блок входа (Login)
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    
    // Исправленный локатор ошибки входа
    this.loginErrorMessage = page.locator('form[action="/login"] p').filter({ hasText: 'incorrect' }); 

    // Блок регистрации (Signup)
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    
    // Исправленный локатор ошибки регистрации
    this.signupErrorMessage = page.locator('form[action="/signup"] p').filter({ hasText: 'already exist' }); 
  }

  // Действие: Быстрый логин одной функцией
  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
