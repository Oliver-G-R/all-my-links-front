type AlertState = 'Info' | 'Success' | 'Error'
interface ResponseTypeAlert {
    message: string | string[] | null
    type: AlertState | null
}

export type{
    AlertState,
    ResponseTypeAlert
}
