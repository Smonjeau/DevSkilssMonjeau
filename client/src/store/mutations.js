
export default {
    initialiseStore(state) {
        // Check if the ID exists
        if(localStorage.getItem('store')) {
            // Replace the state object with the stored item
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('store')))
            );
            //if (state.loggedUser !== null) {
            //    store.commit('refreshLoggedUser')
        //    }
        }
    }
}