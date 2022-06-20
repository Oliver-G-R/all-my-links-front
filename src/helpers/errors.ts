export const getError = (error: Array<string> | string) =>
    typeof error === 'string'
                    ? error
                    : error[0]
