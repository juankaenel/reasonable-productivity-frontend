<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset="3">
        <h1>Tasks</h1>
        <v-text-field
          v-model="newTask.title"
          label="Enter task (Press enter)"
          @keypress.enter="addTask"
        ></v-text-field>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="(task, i) in tasks" :key="i">
              <template v-slot:default="{active}">

                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <!--Si selecciona editar la tarea me muestra esto-->
                  <!--este span se activa cuando cuando doy click editTask a editar una tarea-->
                  <span
                    v-if="editingTask.id === task.id"
                    class="d-flex justify-space-between align-center"
                  >
                      <v-text-field
                        v-model="editingTask.title"
                        append-outer-icon="mdi-check"
                        @click:append-outer="saveEdit()"
                        @keypress.enter="saveEdit()"
                      />
                      <v-icon @click.stop="cancelEdit">mdi-close-circle</v-icon>
                    </span>

                  <!--Si no está seleccionada la tarea me muestra esto-->
                    <span v-else class="d-flex justify-space-between align-center">
                      {{ task.title }}
                      <span>
                        <v-icon @click.stop="editTask(i)">mdi-pencil</v-icon> <!--Me activa la tarea a editar en ese momento y se activa el span de arriba -->
                        <v-icon @click.stop="removeTask(task.id)">mdi-delete-outline</v-icon>
                      </span>
                    </span>

                </v-list-item-content>

              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        newTask:{
          title:'',
          description: '',
          user: 1,
        },
        editingTask: {

        },

      }
    },

    computed: {
      ...mapState('tasks', ['tasks']), //el nombre del archivo en el store, y el estado
    },
    created() {
      this.getAllTasks()
    },
    methods: {
      ...mapMutations('tasks', ['ADD_TASK','EDIT_TASK','DELETE_TASK','TOGGLE_TASK',]), //acá cargo todas las mutaciones de tasks.js del store
      ...mapActions('tasks', ['getAllTasks','postNewTask','deleteTask','patchTask']),


      addTask() {
        this.postNewTask(this.newTask) //llamo a la accíon  y le paso la nueva tarea
        this.newTask = '' //vacio el field text
      },
      editTask(index) {
        this.editingTask = {
          ...this.tasks[index]
        }
      },
      removeTask(taskId){
        this.deleteTask(taskId)
      }
    ,
      cancelEdit() {
        this.editingTask= {}
      },
      saveEdit() {
        const payload = {
          id : this.editingTask.id,
          taskData : this.editingTask
        }
        delete payload.taskData.id
        this.patchTask(payload)
        this.cancelEdit()
      }
    }


  }
</script>
