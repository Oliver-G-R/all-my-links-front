export interface UserState {
    user: {
        token: string | null,
        isActive: boolean,
    },
    error: string | null
}

const state = (): UserState => {
    return {
        user: {
            token: null,
            isActive: false
        },
        error: null
    }
}

export default state
