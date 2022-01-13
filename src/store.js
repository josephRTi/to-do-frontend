import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            Token: "",
            username: "",
            user_id: 0
        }
    }
})
