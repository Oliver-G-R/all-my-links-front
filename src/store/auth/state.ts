export interface AuthState {
    user: {
        token: string | null
        isActive: boolean
        id?: string | null
    }
    error: string | null
}

const state = (): AuthState => {
    return {
        user: {
            token: null,
            isActive: false,
            id: null
        },
        error: null
    }
}

export default state
