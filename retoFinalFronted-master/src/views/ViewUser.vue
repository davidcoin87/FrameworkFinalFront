<template>
<div >
  <h1 style="text-align:center;margin-bottom: 10PX;">Asignaturas</h1>
 <!-- <div class="col-4">
    <div class="form-group">
        <label for="docente">Semestre</label>
        <form @submit.prevent="iniciarSesion">
        <select @change="this.form.submit();" v-model="docenteSeleccionado"  class="form-control" id="semestre" placeholder="Seleccione un semestre">          
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
            <option :value="6">6</option>
            <option :value="7">7</option>
            <option :value="8">8</option>
            <option :value="9">9</option>
            <option :value="10">10</option>
        </select>
        </form>
    </div>
</div>-->
</div>
  <div style="display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-direction: row;">
     
     <b-card title="Card Title"
    img-src="../assets/logo.png"
    img-alt="Image"
    img-top
    tag="article"
    style="display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;max-width: 20rem;"
    class="mb-2"  v-for="course in courses" :key="course.id"
  >
    <b-card-text >
      {{ course.name }}
        </b-card-text>
        <b-card-text>
      {{ course.numbers_credits }}
        </b-card-text>
        <button  @click="modificar=true; abrirModal(course);" class="btn btn-success">Mas informacion</button>

  </b-card>
</div>
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
                <input v-model="courses.name" type="text" class="form-control" disabled  id="name" placeholder="Asignatura">
              </div>
              <div class="my-4">
                <label for="numbers_credits">Cantidad de creditos</label>
                <input v-model="courses.numbers_credits" type="number" disabled  class="form-control" id="numbers_credits" placeholder="Cantidad de creditos">
              </div>
              <div class="my-4">
                <label for="teacher_name">Nombre del docente</label>
                <input v-model="courses.teacher_name" type="text" disabled class="form-control" id="teacher_name" placeholder="Nombre del docente">
              </div>
                <div class="my-4">
                    <label for="prerequisite_subject">Asignatura prerrequisito</label>
                    <input v-model="courses.prerequisite_subject" type="text" disabled  class="form-control" id="prerequisite_subject" placeholder="Asignatura prerrequisito">
                </div>
                <div class="my-4">
                    <label for="number_hours_autonomous">Cantidad de horas de trabajo autonomo</label>
                    <input v-model="courses.number_hours_autonomous" type="text" disabled  class="form-control" id="number_hours_autonomous" placeholder="Cantidad de horas de trabajo autonomo">
                </div>
                <div class="my-4">
                    <label for="number_hours_directed">Cantidad de horas de trabajo dirigido</label>
                    <input v-model="courses.number_hours_directed" type="text" disabled  class="form-control" id="number_hours_directed" placeholder="Cantidad de horas de trabajo dirigido">
                </div>
                <div class="my-4">
                    <label for="semesters">Semestre</label>
                    <input v-model="courses.semesters" type="text" class="form-control" disabled  id="semesters" placeholder="Semestre">
                </div>
            </div>
  
            <!-- Modal footer -->
            <div class="modal-footer">
              <button @click="cerrarModal();" type="button" class="btn btn-secondary" data-dismiss="modal">
                Cerrar
              </button> 
            </div>
          </div>
        </div>
      </div>
  
</template>
<script>
export default{
name:'ViewUser',
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
  
      document.getElementById('login').innerHTML = '<a href="http://localhost:8080/login"  class="btn btn-danger" type="button" >Salir</button>';

      },
      async eliminar(id) {
          await this.axios.delete('/courses/' + id);
        this.listar();
      },
      async guardar() {
        if(this.modificar){
         await this.axios.put('/courses/'+this.id, this.courses);
          // console.log(this.id);
  
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
          this.tituloModal="Información de Asignatura";
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
          this.courses.name=''; 
          this.courses.numbers_credits='';
          this.courses.teacher_name='';
          this.courses.prerequisite_subject='';
          this.courses.number_hours_autonomous='';
          this.courses.number_hours_directed='';
          this.courses.semesters='';
    
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