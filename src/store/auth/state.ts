export interface AuthState {
    user: {
        token: string | null
        isActive: boolean
        id?: string | null
    }
}

const state = (): AuthState => {
    return {
        user: {
            token: null,
            isActive: false,
            id: null
        }
    }
}

export default state
