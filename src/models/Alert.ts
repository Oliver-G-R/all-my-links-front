type AlertState = 'Info' | 'Success' | 'Error'
interface ResponseTypeAlert {
    message: string | string[] | null
    type: AlertState
}

export type{
    AlertState,
    ResponseTypeAlert
}
