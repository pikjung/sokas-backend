export default function responseJson(status: string, data: any, message: string) {
  const resJson = {
    status: status,
    data: data,
    message: message
  }

  return resJson
}