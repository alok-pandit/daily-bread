// Code generated by tygo. DO NOT EDIT.

//////////
// source: products.go

export interface GetProductsInput {
  before: string;
  after: string;
  first: number /* int32 */;
  last: number /* int32 */;
}

//////////
// source: users.go

export interface CreateUserInput {
  fullname: string;
  username: string;
  password: string;
}
export interface LoginAPIInputs {
  username: string;
  password: string;
}
export interface LoginAPIResponse {
  success: boolean;
  message: string;
}
