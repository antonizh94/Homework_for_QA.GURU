export class ArticlePage {
  constructor(page) {
    this.page = page;

    // Техническое описание страницы селекторы/локаторы
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' }).first();
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
  }

  // Возвращает локатор заголовка статьи
  getArticleTitle(title) {
    return this.page.getByRole('heading', { name: title });
  }

  // Возвращает локатор текста статьи
  getArticleBody(body) {
    return this.page.getByText(body);
  }

  // Возвращает локатор тега статьи
  getArticleTag(tag) {
    return this.page.getByText(tag, { exact: true });
  }

  // Возвращает локатор ссылки Edit Article
  getEditArticleLink() {
    return this.editArticleLink;
  }

  // Переходит на страницу редактирования статьи
  async openEditor() {
    await this.editArticleLink.click();
  }

  // Оставляет комментарий под статьёй
  async addComment(comment) {
    await this.commentInput.fill(comment);
    await this.postCommentButton.click();
  }

  // Возвращает карточку конкретного комментария
  getCommentCard(comment) {
    return this.page.locator('.card').filter({ hasText: comment });
  }

  // Возвращает автора конкретного комментария
  getCommentAuthor(comment, username) {
    return this.getCommentCard(comment).locator('.comment-author').filter({ hasText: username });
  }
}