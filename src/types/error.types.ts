import { BaseResponse } from "./http.types";

/**
 * Custom error class for handling HTTP exceptions
 * Extends the built-in Error class with HTTP-specific properties
 * 
 * @class HttpException
 * @extends {Error}
 * @example
 * // Throwing a 404 error
 * throw new HttpException(
 *   HttpStatusCode.NOT_FOUND,
 *   'User not found',
 *   'Unable to find user with provided ID'
 * );
 * 
 * // Throwing a 400 error
 * throw new HttpException(
 *   HttpStatusCode.BAD_REQUEST,
 *   'Invalid input',
 *   'Email format is incorrect'
 * );
 */
export class HttpException extends Error {
  constructor(
    public status: HttpStatusCode,
    public message: string,
    public error?: string
  ) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

/**
 * Interface for standardized error responses
 * Extends BaseResponse to maintain consistent API response structure
 * 
 * @interface ErrorResponse
 * @extends {BaseResponse}
 * @property {number} status - HTTP status code
 * @property {string} [error] - Detailed error message or error code
 * @property {string} [stack] - Stack trace (included only in development)
 * @example
 * const errorResponse: ErrorResponse = {
 *   success: false,
 *   message: 'Resource not found',
 *   status: HttpStatusCode.NOT_FOUND,
 *   error: 'User with ID 123 does not exist'
 * };
 */
export interface ErrorResponse extends BaseResponse {
  status: number;
  error?: string;
  stack?: string;
}

/**
 * Interface for validation error details
 * Used to provide specific information about field validation failures
 * 
 * @interface ValidationError
 * @property {string} field - Name of the field that failed validation
 * @property {string} message - Validation error message for the field
 * @example
 * const validationError: ValidationError = {
 *   field: 'email',
 *   message: 'Email must be a valid email address'
 * };
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Interface for responses containing validation errors
 * Extends ErrorResponse to include an array of field-specific validation errors
 * 
 * @interface ValidationErrorResponse
 * @extends {ErrorResponse}
 * @property {ValidationError[]} errors - Array of validation errors
 * @example
 * const validationResponse: ValidationErrorResponse = {
 *   success: false,
 *   message: 'Validation failed',
 *   status: HttpStatusCode.BAD_REQUEST,
 *   errors: [
 *     { field: 'email', message: 'Invalid email format' },
 *     { field: 'password', message: 'Password too short' }
 *   ]
 * };
 */
export interface ValidationErrorResponse extends ErrorResponse {
  errors: ValidationError[];
}

/**
 * Enum for HTTP status codes
 * Provides type-safe status codes for HTTP responses
 * 
 * @enum {number}
 * @example
 * // Using in error handling
 * throw new HttpException(HttpStatusCode.NOT_FOUND, 'User not found');
 * 
 * // Using in response
 * res.status(HttpStatusCode.CREATED).json({
 *   success: true,
 *   message: 'User created successfully'
 * });
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
} 