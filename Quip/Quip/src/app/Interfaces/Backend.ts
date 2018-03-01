export class Backend {
  baseUrl: string = 'http://ec2-18-217-35-135.us-east-2.compute.amazonaws.com:8990/';
  signUp: string = this.baseUrl + 'signup';
  signIn: string = this.baseUrl + 'signin';
  exists: string = this.baseUrl + 'exists';
  account: string = this.baseUrl + 'accounts';
  profile: string = this.baseUrl + 'profile';
  post: string = this.baseUrl + 'posts';
  comment: string = this.baseUrl + 'comments';
  accountUpdate: string = this.account + '/update';
  commentUpdate: string = this.comment + '/update';
  postUpdate: string = this.post + '/update';
}