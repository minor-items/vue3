const urlName = '/datamap-dataassets-server/query'
export default (Axios: any): any => {
  return {
    getUser (count: number) {
      return Promise.resolve().then(() => {
        console.log('resolve', count)
        return count
      })
    }
  }
}
