<template>
  <div >
    <h1 class="text-center">Asignaturas</h1>
    <hr />

    <!-- Button to Open the Modal -->
    <button @click="modificar=false; abrirModal();" type="button" class="btn btn-primary my-4">Nuevo</button>

    <!-- The Modal -->
    <div class="modal" :class="{mostrar: modal}">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{tituloModal}}</h4>
            <button @click="cerrarModal();"  type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="my-4">
              <label for="name">Asignatura</label>
              <input v-model="courses.name" type="text" class="form-control" id="name" placeholder="Asignatura">
            </div>
            <div class="my-4">
              <label for="numbers_credits">Cantidad de creditos</label>
              <input v-model="courses.numbers_credits" type="number" class="form-control" id="numbers_credits" placeholder="Cantidad de creditos">
            </div>
            <div class="my-4">
              <label for="teacher_name">Nombre del docente</label>
              <input v-model="courses.teacher_name" type="text" class="form-control" id="teacher_name" placeholder="Nombre del docente">
            </div>
              <div class="my-4">
                  <label for="prerequisite_subject">Asignatura prerrequisito</label>
                  <input v-model="courses.prerequisite_subject" type="text" class="form-control" id="prerequisite_subject" placeholder="Asignatura prerrequisito">
              </div>
              <div class="my-4">
                  <label for="number_hours_autonomous">Cantidad de horas de trabajo autonomo</label>
                  <input v-model="courses.number_hours_autonomous" type="text" class="form-control" id="number_hours_autonomous" placeholder="Cantidad de horas de trabajo autonomo">
              </div>
              <div class="my-4">
                  <label for="number_hours_directed">Cantidad de horas de trabajo dirigido</label>
                  <input v-model="courses.number_hours_directed" type="text" class="form-control" id="number_hours_directed" placeholder="Cantidad de horas de trabajo dirigido">
              </div>
              <div class="my-4">
                  <label for="semesters">Semestre</label>
                  <input v-model="courses.semesters" type="text" class="form-control" id="semesters" placeholder="Semestre">
              </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="cerrarModal();" type="button" class="btn btn-secondary" data-dismiss="modal">
              Cancelar
            </button>
            <button  @click="guardar();" type="button" class="btn btn-success" data-dismiss="modal">
              Guardar
            </button>


          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped" style="text-align: center;" >
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Asignatura</th>
          <th scope="col">Numero de credistos</th>
          <th scope="col">Semestre</th>
          <th scope="col" colspan="2" class="text-center">Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <th scope="row">{{ course.id }}</th>
          <td>{{ course.name }}</td>
          <td>{{ course.numbers_credits }}</td>
          <td>{{ course.semesters }}</td>
          <td>

              <button  @click="modificar=true; abrirModal(course);" class="btn btn-warning">Editar</button>
          </td>
          <td>
            <button @click="eliminar(course.id)" class="btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>




export default {
  name: 'Courses',
  data() {
    return {
      course:{
            name: '',
            numbers_credits:'',
            teacher_name: '',
            prerequisite_subject: '',
            number_hours_autonomous: '',
            number_hours_directed:'',
            semesters: ''
       
      },
      id: 0,
      modificar:true,
      modal:0,
      tituloModal:'',
      courses: [],
      };
   
  },

  methods: {
     
    async listar() {
      const res = await this.axios.get('/courses');
    this.courses = res.data;
    var rol= localStorage.getItem('rol')
              var number = rol * 2;
            console.log(number)
            if(number<3){
            this.$router.push('/Courses');
            document.getElementById('login').innerHTML = '<a href="http://localhost:8080/login"  class="btn btn-danger" type="button" >Salir</button>';
            }else{
              this.$router.push('/ViewUser');
            }

    },
    async eliminar(id) {
        await this.axios.delete('/courses/' + id);
      this.listar();
    },
    async guardar() {
      if(this.modificar){
       await this.axios.put('/courses/'+this.id, this.courses);
        console.log(this.id);

      }else{
         await this.axios.post('/courses/', this.courses);
        console.log(this.courses)
      }
      this.cerrarModal();
      this.listar();
    },
    abrirModal(data={}){
      this.modal=1;
      if(this.modificar){
        this.id=data.id;
        this.tituloModal="Modificar Asignatura";
        this.courses=data;
        this.courses.name=data.name; 
        this.courses.numbers_credits=data.numbers_credits;
        this.courses.teacher_name=data.teacher_name;
        this.courses.prerequisite_subject=data.prerequisite_subject;
        this.courses.number_hours_autonomous=data.number_hours_autonomous;
        this.courses.number_hours_directed=data.number_hours_directed;
        this.courses.semesters=data.semesters;
      }else{
        this.id=0;
        this.courses=data;
        this.tituloModal="Crear Asignatura";
        this.courses.name=''; 
        this.courses.numbers_credits='';
        this.courses.teacher_name='';
        this.courses.prerequisite_subject='';
        this.courses.number_hours_autonomous='';
        this.courses.number_hours_directed='';
        this.courses.semesters='';
        console.log(this.courses);
  
      }
    },
    cerrarModal(){
      this.modal=0;
    },
  },
  created() {
    this.listar();
  },
};

</script>

<style>
  .mostrar{
    display: list-item;
    opacity: 1;
      background: rgb(155 153 162 / 52%);
  }
</style>
