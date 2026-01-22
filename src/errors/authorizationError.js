export class AuthorizationError extends Error {
  constructor(message = 'Acesso negado') {
    super(message)
    this.name = 'AuthorizationError'
    this.status = 403
  }
}