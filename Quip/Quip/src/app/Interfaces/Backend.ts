export class Backend {
  baseUrl: string = 'http://localhost:8990/';
  signUp: string = this.baseUrl + 'signup';
  signIn: string = this.baseUrl + 'signin';
  exists: string = this.baseUrl + 'exists';
  account: string = this.baseUrl + 'accounts';
  profile: string = this.baseUrl + 'profile';
  post: string = this.baseUrl + 'post';
  comment: string = this.baseUrl + 'comment';
}