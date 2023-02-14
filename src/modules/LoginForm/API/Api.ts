interface LoginFormInputs {
  email: string;
  password: string;
}
const API_KEY = "AIzaSyDK3LIowqW-g-iLiEaqMgbMWAg92kyNGCc";
export class LoginApi {
  static async login(loginInputs: LoginFormInputs) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInputs.email,
        password: loginInputs.password,
        returnSecureToken: true,
      }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  }
  static async getInfo(idToken: string) {
    if (idToken) {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
      });
      const data = await response.json();
      console.log(data)
      if (data.error) {
        this.exchangeToken(JSON.parse(localStorage.getItem("refreshToken")!));
      } else {
        return data;
      }
    }
  }
  static async exchangeToken(refreshToken: string) {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    const newTokens = await response.json();
    console.log(newTokens)
    if(newTokens.error) {
        console.log('refresh expired')
        return
    } else {
        localStorage.setItem("idToken", newTokens.access_token);
        localStorage.setItem("refreshToken", newTokens.refresh_token);
        this.getInfo(newTokens.access_token)
    }
  }
}
