<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset="3">
        <h1>Tasks</h1>
        <v-text-field
          v-model="newTask"
          label="Enter task (Press enter)"
          @keypress.enter="addTask"
        ></v-text-field>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="(todo, index) in list" :key="index">
              <template v-slot:default="{active}">

                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <!--Si selecciona editar la tarea me muestra esto-->
                    <span
                      v-if="editingTask.index === index"
                      class="d-flex justify-space-between align-center"
                    >
                      <v-text-field
                        v-model="editingTask.text"
                        append-outer-icon="mdi-check"
                        @click:append-outer="saveEdit"
                        @keypress.enter="saveEdit"
                      />
                      <v-icon @click.stop="cancelEdit">mdi-close-circle</v-icon>
                    </span>

                    <!--Si no está seleccionada la tarea me muestra esto-->
                    <span v-else class="d-flex justify-space-between align-center">
                      {{todo.text}}
                      <span>
                        <v-icon @click.stop="editTask(index)">mdi-pencil</v-icon>
                        <v-icon @click.stop="remove(index)">mdi-delete-outline</v-icon>
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
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        newTask: "",
        editingTask: {
          index: -1,
          text: ''
        }

      }
    },

    computed: {
      ...mapState('tasks', ['list'])
    },
    methods: {
      ...mapMutations('tasks', ['add','edit', 'remove', 'toggle']), //acá cargo todas las mutaciones de tasks
      addTask() {
        this.add(this.newTask) //llamo a la mutacion y le paso la nueva tarea
        this.newTask = '' //vacio el field text
      },
      editTask(index) {
        this.editingTask.index = index
        this.editingTask.text = this.list[index].text
      },
      cancelEdit() {
        this.editingTask.index = -1
        this.editingTask.text = ''
      },
      saveEdit() {
        this.edit(this.editingTask) //edita la tarea a traves de la mutación
        this.cancelEdit() //una vez que edita sale de la tarea con cancelar
      }


    }
  }
</script>
