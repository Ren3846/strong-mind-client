import * as authActions from './auth'

export type ExtractActions<T> = T[keyof T] extends (...args: any[]) => infer R ? R : never

export { authActions }
