export class YourfeedPage {
  constructor(page) {
    this.page = page;

    // Техническое описание страницы селекторы/локаторы
    this.profileName = page.getByRole('navigation');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.yourFeed = page.getByRole('main');
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
    this.firstArticlePreviewLink = page.locator('.article-preview').first().locator('.preview-link');
  }

  // Возвращает локатор блока навигации, где отображается имя пользователя
  getProfileName() {
    return this.profileName;
  }

  // Возвращает локатор ссылки New Article
  getNewArticleLink() {
    return this.newArticleLink;
  }

  // Возвращает локатор основной области страницы Your Feed
  getYourFeed() {
    return this.yourFeed;
  }

  // Переходит на страницу создания новой статьи
  async openNewArticle() {
    await this.newArticleLink.click();
  }

  // Открывает настройки профиля пользователя
  async openSettings(username) {
    await this.page.getByText(username).click();
    await this.settingsLink.click();
  }

  // Открывает первую статью из Global Feed
  async openFirstArticleFromGlobalFeed() {
    await this.globalFeedButton.click();
    await this.firstArticlePreviewLink.click();
  }
}