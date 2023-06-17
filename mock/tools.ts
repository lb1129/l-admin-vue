export const response = <T>(data: T, message?: string) =>
  JSON.stringify({
    data,
    message: message ?? 'ok'
  })
