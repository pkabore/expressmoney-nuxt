export const state = () => ({
	email: ''
});

export const mutations = {
	set(state, email) {
		state.email = email;
	}
};
