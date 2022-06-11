export interface UserState {
    user: {
        token: string | null,
        isActive: boolean,
    },
    isLoading: boolean,
    error: string | null
}

const state = (): UserState => {
    return {
        user: {
            token: null,
            isActive: false
        },
        isLoading: true,
        error: null
    }
}

export default state
