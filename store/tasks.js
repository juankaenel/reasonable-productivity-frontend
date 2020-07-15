import axios from 'axios'

const API_URL = 'http://localhost:8000'


/*----------------------------------------------STATE----------------------------------------------------*/
export const state = () => ({
  tasks: []
})
/*-------------------------------------------END STATE-------------------------------------------------*/

/*---------------------------------------------ACTIONS------------------------------------------------------*/
export const actions = {
  async getAllTasks ({commit}) {
    const {data} = await axios.get(`${API_URL}/tasks/`)
    commit('SET_TASK', data)  //hago el commit a través de la mutación setTasks y le paso la data de la consulta
  },
  async postNewTask({commit}, payload){ //recibo por payload la nueva tarea
    const {data} = await axios.post(`${API_URL}/tasks/`,payload)
    commit('ADD_TASK',data)
  },
  async deleteTask({ commit }, id){ //recibo por payload la nueva tarea
    await axios.delete(`${API_URL}/tasks/${id}/`)
    commit('DELETE_TASK', id)
  },
  async patchTask({commit}, payload) { //recibo por payload la nueva tarea
    const {id,taskData} = payload
    await axios.patch(`${API_URL}/tasks/${id}/`, taskData)
    commit('EDIT_TASK', payload)
  }
}
/*-------------------------------------------END ACTIONS-------------------------------------------------*/


/*---------------------------------------------MUTATIONS--------------------------------------------------*/
export const mutations = {
  SET_TASK (state,tasks){
      state.tasks = tasks //el estado de una tarea es igual a lo que viene por parametro del commit que se realiza en la consulta a la api getAllTasks
  },
  ADD_TASK(state,task){
    state.tasks.push(task)
  },
  EDIT_TASK(state,payload){
    const {index,title} = payload //el payload recibe el index y el titleo
    const updatedTask = { //la tarea a actualizar toma el estado cuyo indice va a actualizar y el titleo nuevo
      ...state.tasks[index],
      title
    }
    state.tasks.splice(index,1,updatedTask) //elimina el elemnto a editar y agrega otro en su lugar
  }
  ,
  DELETE_TASK(state, id){
    const index = state.tasks.findIndex((task)=>{
      return task.id === id
    })

    state.tasks.splice(index)
  },
  TOGGLE_TASK(state,todo){
    todo.done = !todo.done
  }
}
/*-------------------------------------------END MUTATIONS-------------------------------------------------*/
