export class AuthorizationError extends Error {
  constructor(message = 'Acesso negado') {
    super(message)
    this.name = 'AuthorizationError'
    this.statusCode = 403
  }
}