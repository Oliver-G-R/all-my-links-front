const getError = (error: Array<string> | string):string =>
    typeof error === 'string'
                    ? error
                    : error[0]

const catchError = <T>(error:any):T => {
    if (error.response.data) {
        return error.response.data
    } else {
        return error
    }
}
export {
    getError,
    catchError
}
