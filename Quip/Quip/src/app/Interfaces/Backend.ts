export class Backend {
  baseUrl: string = 'http://localhost:8990/';
  signUp: String = this.baseUrl + '/signup';
  signIn: String = this.baseUrl + '/signin';
  account: String = this.baseUrl + '/account';
  profile: String = this.baseUrl + '/profile';
  post: String = this.baseUrl + '/post';
  comment: String = this.baseUrl + '/comment';
}