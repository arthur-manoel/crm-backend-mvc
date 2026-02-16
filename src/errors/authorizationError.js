export class AuthorizationError extends Error {
  constructor(message = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
    this.status = 403
  }
}