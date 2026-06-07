import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourfeedPage } from '../src/pages/yourfeed.page';
import { EditorPage } from '../src/pages/editor.page';
import { ArticlePage } from '../src/pages/article.page';
import { SettingsPage } from '../src/pages/settings.page';

const createUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.person.fullName(),
});

const generateArticle = () => ({
  title: faker.lorem.words(4),
  description: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  tag: faker.lorem.word(),
});

const generateUpdatedArticle = () => ({
  title: faker.lorem.words(4),
  body: faker.lorem.paragraph(),
});

/// ТЕСТ №1

test('Пользователь может создать статью', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourfeedPage(page);
  const editor = new EditorPage(page);
  const articlePage = new ArticlePage(page);

  const user = createUser();
  const article = generateArticle();

  await main.open();

  // Подготовка: переходим на страницу регистрации
  await main.gotoRegister();

  // Подготовка: регистрируем пользователя
  await register.signup(user);

  // Проверяем, что пользователь авторизован и может создать статью
  await expect(yourfeed.getNewArticleLink()).toBeVisible();

  // Переходим на страницу создания статьи
  await yourfeed.openNewArticle();

  // Создаём статью
  await editor.publishArticle(article);

  // Проверяем, что статья создана
  await expect(articlePage.getArticleTitle(article.title)).toBeVisible();
  await expect(articlePage.getArticleBody(article.body)).toBeVisible();
  await expect(articlePage.getArticleTag(article.tag)).toBeVisible();
});

/// ТЕСТ №2

test('Пользователь может отредактировать свою статью', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourfeedPage(page);
  const editor = new EditorPage(page);
  const articlePage = new ArticlePage(page);

  const user = createUser();
  const article = generateArticle();
  const updatedArticle = generateUpdatedArticle();

  await main.open();

  // Подготовка: переходим на страницу регистрации
  await main.gotoRegister();

  // Подготовка: регистрируем пользователя
  await register.signup(user);

  // Проверяем, что пользователь авторизован
  await expect(yourfeed.getNewArticleLink()).toBeVisible();

  // Переходим на страницу создания статьи
  await yourfeed.openNewArticle();

  // Создаём статью
  await editor.publishArticle(article);

  // Проверяем, что статья создана
  await expect(articlePage.getArticleTitle(article.title)).toBeVisible();

  // Переходим на страницу редактирования статьи
  await articlePage.openEditor();

  // Редактируем статью
  await editor.updateArticle(updatedArticle);

  // Проверяем, что статья обновилась
  await expect(articlePage.getArticleTitle(updatedArticle.title)).toBeVisible();
  await expect(articlePage.getArticleBody(updatedArticle.body)).toBeVisible();
});

/// ТЕСТ №3

test('Пользователь может открыть настройки профиля и увидеть свои данные', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourfeedPage(page);
  const settings = new SettingsPage(page);

  const user = createUser();

  await main.open();

  // Подготовка: переходим на страницу регистрации
  await main.gotoRegister();

  // Подготовка: регистрируем пользователя
  await register.signup(user);

  // Переходим в настройки профиля
  await yourfeed.openSettings(user.username);

  // Проверяем, что открылась страница настроек
  await expect(settings.getHeading()).toBeVisible();

  // Проверяем, что в настройках отображаются данные зарегистрированного пользователя
  await expect(settings.getNameInput()).toHaveValue(user.username);
  await expect(settings.getEmailInput()).toHaveValue(user.email);
});

/// ТЕСТ №4

test('Пользователь может оставить комментарий к статье', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourfeedPage(page);
  const articlePage = new ArticlePage(page);

  const user = createUser();

  await main.open();

  // Подготовка: переходим на страницу регистрации
  await main.gotoRegister();

  // Подготовка: регистрируем пользователя
  await register.signup(user);

  // Открываем первую статью из Global Feed
  await yourfeed.openFirstArticleFromGlobalFeed();

  // Оставляем комментарий
  const comment = `New comment from ${user.username}`;

  await articlePage.addComment(comment);

  // Проверяем, что комментарий появился под статьёй
  await expect(articlePage.getCommentCard(comment)).toBeVisible();

  // Проверяем, что комментарий оставлен от имени текущего пользователя
  await expect(articlePage.getCommentAuthor(comment, user.username)).toBeVisible();
});

/// ТЕСТ №5

test('Пользователь не может зарегистрироваться с уже существующим email', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourfeed = new YourfeedPage(page);

  const user = createUser();

  await main.open();

  // Первая регистрация
  await main.gotoRegister();
  await register.signup(user);

  await expect(yourfeed.getYourFeed()).toContainText('Your Feed');
  await expect(yourfeed.getProfileName()).toContainText(user.username);

  // Очищаем авторизацию в браузере
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.context().clearCookies();

  await main.open();

  // Вторая регистрация с теми же данными
  await main.gotoRegister();
  await register.signup(user);

  await expect(page.getByText('Email already exists.. try logging in')).toBeVisible();
});