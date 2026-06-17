// pages/ProductPage.js
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page); // Наследуем базовые элементы (меню, навигацию)
    
    // Элементы страницы каталога товаров
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productItems = page.locator('.single-products'); // Все карточки товаров на странице
    
    // Элементы всплывающего окна (оверлея) после добавления в корзину
    this.addedOverlayMessage = page.locator('.modal-content .modal-body p').first();
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    
    // Элементы самой страницы корзины (Cart)
    this.cartRows = page.locator('tbody tr'); // Строки с товарами в корзине
    this.cartEmptyMessage = page.locator('#empty_cart p'); // Текст "Cart is empty!"
    this.deleteFromCartButton = page.locator('.cart_quantity_delete'); // Кнопка "Х" для удаления
  }

  // Метод: Искать товар на странице каталога
  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

    // Метод: Добавить первый найденный товар в корзину
  async addFirstProductToCart() {
    // Наводим мышку на первую карточку товара
    await this.productItems.first().hover();
    // ИСПРАВЛЕНО: Добавили .first() к кнопке, чтобы кликнуть по первой из двух копий
    await this.productItems.first().getByText('Add to cart').first().click();
  }

}
