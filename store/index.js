export const state = () => ({
    count: 0,
    lang: 'ar',
    email: '',
    code: '',
    studentName: '',
    sectionID: null
});

export const mutations = {
    CHANGE_LANG: (state, payload) => {
        state.lang = payload;
    },
    assign: (state, email) => {
        state.email = email
        console.log(state.email)

    },
    assignCode: (state, code) => {
        state.code = code

    },
    assignName: (state, {

        id
    }) => {

        state.sectionID = id
        localStorage.setItem("id", id)

    },
    // assignSubjectID: (state, id) => {
    //     state.id = id
    // }
};

export const actions = {
    assignEmail: ({
        commit
    }, email) => {
        commit('assign', email)
    },
    assignCode: ({
        commit
    }, code) => {
        commit('assignCode', code)
    },
    assignName: ({
        commit
    }, name) => {
        commit('assignName', name)
    }

};

export const getters = {

};