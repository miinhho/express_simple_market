import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

/**
 * Type-safe request interface that extends Express Request
 * @template Body - Type for the request body (e.g., POST data)
 * @template Query - Type for URL query parameters
 * @example
 * interface LoginBody {
 *   email: string;
 *   password: string;
 * }
 * 
 * // Usage in route handler
 * app.post('/login', (req: TypedRequest<LoginBody>) => {
 *   const { email, password } = req.body; // Fully typed!
 * });
 */
export interface TypedRequest<
  Body = unknown,
  Query extends ParsedQs = ParsedQs
> extends Request<ParamsDictionary, any, Body, Query> {
  body: Body;
  query: Query;
}

/**
 * Type-safe response interface that extends Express Response
 * @template ResBody - Type for the response body
 * @example
 * interface UserResponse {
 *   id: number;
 *   name: string;
 * }
 * 
 * // Usage in route handler
 * app.get('/user', (req, res: TypedResponse<UserResponse>) => {
 *   res.json({ id: 1, name: 'John' }); // Must match UserResponse type
 * });
 */
export type TypedResponse<ResBody = unknown> = Response<ResBody>;

/**
 * Type-safe handler function for Express routes
 * @template ReqBody - Type for the request body
 * @template ResBody - Type for the response body
 * @template ReqQuery - Type for URL query parameters
 * @example
 * interface GetUserQuery { id: string }
 * interface UserResponse { name: string }
 * 
 * const getUser: TypedHandler<
 *   never,           // No body (GET request)
 *   UserResponse,    // Response type
 *   GetUserQuery     // Query params type
 * > = (req, res) => {
 *   const { id } = req.query; // id is typed as string
 *   res.json({ name: "John" }); // Must match UserResponse
 * };
 */
export type TypedHandler<
  ReqBody = unknown,
  ResBody = unknown,
  ReqQuery extends ParsedQs = ParsedQs
> = (
  req: TypedRequest<ReqBody, ReqQuery>,
  res: TypedResponse<ResBody>,
  next: NextFunction
) => void | Promise<void>;

/**
 * Base interface for API responses
 * Provides a consistent structure for all API responses
 * @property success - Indicates if the operation was successful
 * @property message - A human-readable message about the operation
 * @example
 * interface DataResponse extends BaseResponse {
 *   data: User[];
 * }
 * 
 * const response: DataResponse = {
 *   success: true,
 *   message: "Users retrieved successfully",
 *   data: [{ id: 1, name: "John" }]
 * };
 */
export interface BaseResponse {
  success: boolean;
  message: string;
} 