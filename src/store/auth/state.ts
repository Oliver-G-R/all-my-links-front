export interface AuthState {
    user: {
        token: string | null,
        isActive: boolean,
    },
    error: string | null
}

const state = (): AuthState => {
    return {
        user: {
            token: null,
            isActive: false
        },
        error: null
    }
}

export default state
