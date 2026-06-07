export class SettingsPage {
  constructor(page) {
    this.page = page;

    // Техническое описание страницы селекторы/локаторы
    this.heading = page.getByRole('heading', { name: 'Your Settings' });
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
  }

  // Возвращает локатор заголовка страницы настроек
  getHeading() {
    return this.heading;
  }

  // Возвращает локатор поля имени пользователя
  getNameInput() {
    return this.nameInput;
  }

  // Возвращает локатор поля email пользователя
  getEmailInput() {
    return this.emailInput;
  }
}