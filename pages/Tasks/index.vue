<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset="3">
        <h1>Tasks</h1>
        <v-tabs fixed-tabs v-model="tab">
          <v-tab>All</v-tab>
          <v-tab>Next</v-tab>
          <v-tab>Capture</v-tab>
          <v-tab>Projects</v-tab>
          <v-tab>Backlog</v-tab>
        </v-tabs>

        <!--<v-text-field
          v-model="newTask.title"
          label="Enter task (Press enter)"
          @keypress.enter="addTask"
        ></v-text-field>-->
        <v-text-field v-model="searchValue"
                      placeholder="Search.."
                      append-icon="mdi-magnify">

        </v-text-field>


        <v-tabs-items v-model="tab">
          <!--Primer tab-->
          <v-tab-item>
            <v-row class="d-flex flex-wrap">
              <v-card class="ma-2" width="240px">

                <v-card-title>
                  Next Actions
                </v-card-title>
                <v-card-text>
                  Item 1
                </v-card-text>
              </v-card>

              <v-card class="ma-2" width="240px">
                <v-card-title>
                  Capture
                </v-card-title>
                <v-card-text>
                  Item 1
                </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>
          <!--Fin del primer tab-->

          <!--Segundo tab-->
          <v-tab-item>
            <v-card v-if="newTask.show"> <!--tod esto se muestra cuando doy click en el botón + -->
              <v-card-text>
                <v-text-field placeholder="Title.." v-model="newTask.title"
                              ref="newTaskTitle"
                              outlined/>
                <v-textarea placeholder="Description.." v-model="newTask.description" outlined/>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="addTask">Save</v-btn>
                <v-btn color="accent" @click="toggleNewTask">Cancel</v-btn>
              </v-card-actions>
            </v-card>

            <v-list dense>
              <v-list-item-group color="primary">
                <v-list-item v-for="(task, i) in tasks" :key="i">
                  <template v-slot:default>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="task.completed"
                        @click.stop="toggleChecked(task)"
                      >
                      </v-checkbox>
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
                      <span :class="{'text--disabled text-decoration-line-through': task.completed}">
                        {{ task.title }}
                      </span>
                        <span>
                        <v-icon @click.stop="editTask(i)">mdi-pencil</v-icon>
                        <!--Me activa la tarea a editar en ese momento y se activa el span de arriba -->
                        <v-icon @click.stop="removeTask(task.id)">mdi-delete-outline</v-icon>
                      </span>
                    </span>

                    </v-list-item-content>

                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-tab-item>
          <!--Fin del Segundo tab-->

        </v-tabs-items>

        <!--btn + --->
        <v-btn @click="toggleNewTask" color="primary" fab>
          <!--si le doy click se activa o oculta una nueva tarea para guardar-->
          <v-icon>mdi-plus</v-icon>
        </v-btn>


      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        newTask: {
          title: '',
          description: '',
          user: 1,
          show: false,
        },
        searchValue: '',
        editingTask: {},
        tab: 1,

      }
    },

    computed: {
      ...mapState('tasks', ['tasks']), //el nombre del archivo en el store, y el estado
    },
    created() {
      this.getAllTasks()
    },
    methods: {
      ...mapMutations('tasks', ['ADD_TASK', 'EDIT_TASK', 'DELETE_TASK',]), //acá cargo todas las mutaciones de tasks.js del store
      ...mapActions('tasks', ['getAllTasks', 'postNewTask', 'deleteTask', 'patchTask']),

      toggleNewTask() { //esta función me permite ocultar o mostrar la sección para mostrar una nueva tarea
        this.newTask.show = !this.newTask.show
        if (this.newTask.show) {
          //para permitir llevar el foco al título cuando damos click en el btn +
          this.$nextTick(function () {
            this.$refs.newTaskTitle.focus()
          })
        }
      },
      addTask() {
        this.postNewTask(this.newTask) //llamo a la accíon  y le paso la nueva tarea
        this.newTask = '' //vacio el field text
      },
      editTask(index) {
        this.editingTask = {
          ...this.tasks[index]
        }
      },
      removeTask(taskId) {
        this.deleteTask(taskId)
      }
      ,
      cancelEdit() {
        this.editingTask = {}
      },
      saveEdit() {
        const payload = {
          id: this.editingTask.id,
          taskData: this.editingTask
        }
        delete payload.taskData.id
        this.patchTask(payload)
        this.cancelEdit()
      },
      toggleChecked(task) {
        const payload = {
          id: task.id,
          task: {
            completed: !task.completed
          },
        }
        this.patchTask(payload)
      }
    }


  }
</script>
