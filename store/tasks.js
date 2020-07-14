export const state = () => ({
  list:[{
    text: 'Test', done: false
  }]
})

export const actions = {}

export const mutations = {
  add(state,text){
    state.list.push({
      text,
      done: false
    })
  },
  edit(state,payload){
    const {index,text} = payload //el payload recibe el index y el texto
    const updatedTask = { //la tarea a actualizar toma el estado cuyo indice va a actualizar y el texto nuevo
      ...state.list[index],
      text
    }
    state.list.splice(index,1,updatedTask) //elimina el elemnto a editar y agrega otro en su lugar
  }
  ,
  remove(state, index){
    state.list.splice(index,1)
  },
  toogle(state,todo){
    todo.done = !todo.done
  }
}
