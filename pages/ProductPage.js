// pages/ProductPage.js
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page); 
    
    //Элементы страницы каталога товаров
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productItems = page.locator('.single-products'); // Все карточки товаров на странице
    
    //Элементы всплывающего окна после добавления в корзину
    this.addedOverlayMessage = page.locator('.modal-content .modal-body p').first();
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    
    //Элементы самой страницы корзины
    this.cartRows = page.locator('tbody tr'); // Строки с товарами в корзине
    this.cartEmptyMessage = page.locator('#empty_cart p'); // Текст "Cart is empty!"
    this.deleteFromCartButton = page.locator('.cart_quantity_delete'); // Кнопка "Х" для удаления
  }

  //Метод поиска товара 
  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

    //Метод добавления первого найденного товара
  async addFirstProductToCart() {
    await this.productItems.first().hover();
    await this.productItems.first().getByText('Add to cart').first().click();
  }

}
