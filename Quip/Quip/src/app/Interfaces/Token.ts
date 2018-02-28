export class Token {
  token: string;
  expiry: number;
  constructor(token: string, expiry: number) {
    this.token = token;
    this.expiry = expiry;
  }
}