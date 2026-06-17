// tests/automation.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';

const testUsers = [
  { id: 1, pass: 'Password123', name: 'DDT User One' },
  { id: 2, pass: 'Secure456', name: 'DDT User Two' }
];

test.describe('Блок: Авторизация и Регистрация', () => {

  for (const user of testUsers) {
    test(`Тест 1-2 (DDT): Успешная регистрация для пользователя №${user.id}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate('/login'); // Переходим сразу на страницу логина
      
      const dynamicEmail = `user_ddt_${user.id}_${Math.floor(Math.random() * 1000000)}@testmail.com`;
      
      await loginPage.signupNameInput.fill(user.name);
      await loginPage.signupEmailInput.fill(dynamicEmail);
      await loginPage.signupButton.click();
      
      await expect(page).not.toHaveURL('/login');
    });
  }

  test('Тест 3 (Негативный): Попытка входа с неправильным паролем', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/login'); // Прямой переход
    await loginPage.login('unexisting_user_qa_auto@mail.com', 'IncorrectPassword!!!');
    
    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toHaveText('Your email or password is incorrect!');
  });

  test('Тест 4 (Негативный): Попытка регистрации с пустым полем Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/login'); // Прямой переход
    
    await loginPage.signupNameInput.fill('Tester');
    await loginPage.signupEmailInput.fill(''); 
    await loginPage.signupButton.click();
    
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Блок: Каталог и Корзина', () => {

  test('Тест 5 (Позитивный): Поиск товара по ключевому слову', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/products'); // Прямой переход в каталог в обход рекламы!
    await productPage.searchProduct('dress');
    await expect(productPage.productItems.first()).toBeVisible();
  });

  test('Тест 6 (Позитивный): Добавление первого товара в корзину', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/products'); // Прямой переход в каталог
    await productPage.addFirstProductToCart();
    
    await expect(productPage.addedOverlayMessage).toBeVisible();
    await expect(productPage.addedOverlayMessage).toHaveText('Your product has been added to cart.');
  });

  test('Тест 7 (Позитивный): Удаление товара и проверка очистки корзины', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/products'); // Прямой переход в каталог
    await productPage.addFirstProductToCart();
    await productPage.continueShoppingButton.click();
    
    await productPage.navigate('/view_cart'); // Прямой переход в корзину
    await productPage.deleteFromCartButton.click();
    
    await expect(productPage.cartEmptyMessage).toBeVisible();
    await expect(productPage.cartEmptyMessage).toHaveText('Cart is empty! Click here to buy products.');
  });
});

test.describe('Блок: Подписки и Переходы', () => {

  test('Тест 8 (Позитивный): Успешная подписка на рассылку в подвале сайта', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    
    const randomEmail = `user_${Date.now()}@testmail.com`;
    const subscribeInput = page.locator('#susbscribe_email');
    const subscribeButton = page.locator('#subscribe');
    const successAlert = page.locator('#success-subscribe');
    
    await subscribeInput.fill(randomEmail);
    await subscribeButton.click();
    
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveText('You have been successfully subscribed!');
  });

  test('Тест 9 (Позитивный): Проверка перехода на страницу всех товаров', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/products'); // Прямой переход
    
    const mainTitle = page.locator('.features_items .title');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toHaveText('All Products');
  });

  test('Тест 10 (Негативный): Отправка формы обратной связи без заполнения Email', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/contact_us'); // Прямой переход
    
    await page.locator('[data-qa="name"]').fill('QA Automation');
    await page.locator('[data-qa="subject"]').fill('Без почты');
    await page.locator('[data-qa="submit-button"]').click();
    
    const successMessage = page.locator('.contact-form .alert-success');
    await expect(successMessage).not.toBeVisible();
  });
});
