import axios from 'axios'

const API_URL = 'http://localhost:8000'


/*----------------------------------------------STATE----------------------------------------------------*/
export const state = () => ({
  lists: []
})
/*-------------------------------------------END STATE-------------------------------------------------*/

/*---------------------------------------------ACTIONS------------------------------------------------------*/
export const actions = {
  async getAllLists ({commit}) {
    const {data} = await axios.get(`${API_URL}/lists/`)
    commit('SET_LIST', data)  //hago el commit a través de la mutación setList y le paso la data de la consulta
  },
  async postNewList({commit}, payload){ //recibo por payload la nueva tarea
    const {data} = await axios.post(`${API_URL}/lists/`,payload)
    commit('ADD_LIST',data)
  },
  /*
  async deleteTask({ commit }, id){ //recibo por payload la nueva tarea
    await axios.delete(`${API_URL}/tasks/${id}/`)
    commit('DELETE_TASK', id)
  },*/
  async patchList({commit}, payload) { //recibo por payload el nuevo item
    const {data,listId} = payload
    await axios.patch(`${API_URL}/lists/${listId}/`, data)
    commit('EDIT_LIST', payload)
  }
}
/*-------------------------------------------END ACTIONS-------------------------------------------------*/


/*---------------------------------------------MUTATIONS--------------------------------------------------*/
export const mutations = {
  SET_LIST (state,lists){
      state.lists = lists //el estado de una tarea es igual a lo que viene por parametro del commit que se realiza en la consulta a la api getAllTasks
  },
  ADD_LIST (state,list){
    state.lists.push(list)
  },

  EDIT_LIST(state,payload){
    const index = state.lists.findIndex((list)=>{
      return list.id === payload.listId
    })
    const updatedList = { //la lista a actualizar toma el estado cuyo indice va a actualizar y el nombre nuevo
      ...state.lists[index],
      name : payload.data.name
    }
    state.lists.splice(index,1,updatedList) //elimina el elemnto a editar y agrega otro en su lugar
  }/*
  ,
  DELETE_TASK(state, id){
    const index = state.tasks.findIndex((task)=>{
      return task.id === id
    })

    state.tasks.splice(index)
  },
  TOGGLE_TASK(state,tod o){
    tod o.done = !tod o.done
  }*/
}
/*-------------------------------------------END MUTATIONS-------------------------------------------------*/
