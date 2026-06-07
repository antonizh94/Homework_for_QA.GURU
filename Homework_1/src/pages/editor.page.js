export class EditorPage {
  constructor(page) {
    this.page = page;

    // Техническое описание страницы селекторы/локаторы
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: "What's this article about?" });
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagInput = page.getByRole('textbox', { name: 'Enter tags' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
  }

  // Заполняет форму создания статьи и публикует статью
  async publishArticle(article) {
    const { title, description, body, tag } = article;

    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagInput.fill(tag);
    await this.publishButton.click();
  }

  // Обновляет заголовок и текст уже созданной статьи
  async updateArticle(article) {
    const { title, body } = article;

    await this.titleInput.fill(title);
    await this.bodyInput.fill(body);
    await this.updateButton.click();
  }
}