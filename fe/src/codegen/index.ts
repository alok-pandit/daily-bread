// Code generated by tygo. DO NOT EDIT.

//////////
// source: common.go

export interface ErrorResponse {
  success: boolean;
  message: string;
}

//////////
// source: products.go

export interface GetProductsInput {
  before: string;
  after: string;
  first: number /* int32 */;
  last: number /* int32 */;
}
export interface GetProductsResponse {
  id: string;
  name: string;
  description: string;
  price: number /* float64 */;
  images: string[];
  quantity: number /* int */;
  lastCursor: string;
  firstCursor: string;
  totalCount: number /* int32 */;
}

//////////
// source: users.go

export interface CreateUserInput {
  fullname: string;
  username: string;
  password: string;
}
export interface CreateUserResponse {
  message: string;
  success: boolean;
}
export interface LoginAPIInput {
  username: string;
  password: string;
}
export interface LoginAPIResponse {
  success: boolean;
  message: string;
}
