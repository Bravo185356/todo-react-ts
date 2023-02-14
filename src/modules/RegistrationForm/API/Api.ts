interface RegistrationInputs {
  email: string;
  password: string;
}
const API_KEY = "AIzaSyDK3LIowqW-g-iLiEaqMgbMWAg92kyNGCc";
export class RegistrationApi {
  static async registration(registrationInputs: RegistrationInputs) {
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registrationInputs.email,
        password: registrationInputs.password,
        returnSecureToken: true,
      }),
    });
    console.log("Регистрация");
  }
}
