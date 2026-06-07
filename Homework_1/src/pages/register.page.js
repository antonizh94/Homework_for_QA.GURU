export class RegisterPage {
    constructor(page) {
        
        this.page = page;
    //  Техническое описание страницы селекторы/локаторы

        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });

        this.emailInput = page.getByRole('textbox',  { name: 'Email' });

        this.passwordInput = page.getByRole('textbox',  { name: 'Password'});

        this.signupButton = page.getByRole('button', { name: 'Sign up' });



    }
    // Бизнесовые сценарии
    async signup(user) {

    const {email, password, username} = user;
   
    await this.nameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  } 
};


