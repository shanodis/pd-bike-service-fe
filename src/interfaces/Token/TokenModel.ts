export interface TokenModel {
  sub: string;
  authorities: {
    key: number;
    authority: string;
  }[];
  iat: number;
  exp: number;
  userId: number;
}
