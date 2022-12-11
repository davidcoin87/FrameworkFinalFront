

<template>
  <div class="container">
    <form @submit.prevent="iniciarSesion">
      <h2 class="mb-3">Login</h2>
      <div class="input">
        <label for="email">Email address</label>
        <input  class="form-control" type="text" v-model="email">

      </div>
      <div class="input">
        <label for="password">Password</label>
        <input   class="form-control" type="password" v-model="password">

      </div>
      <button v-show="!loading" type="submit" class="mt-4 btn-pers">
        Login
      </button>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_1"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </form>
  </div>
</template>

<script>
    export default
    {
        name: 'Login',
        data(){
          return {
            email: '',
            password: '',
            loading: false
          }
        },
        methods: {
          async iniciarSesion()
          {
            var payload = {
              email: this.email,
              password: this.password
            };
            this.loading = true;
            await this.axios.post('/login', payload)
            .then(response => {
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id', response.data.user.id);
              localStorage.setItem('rol', response.data.user.rol);
              localStorage.setItem('name', response.data.user.name);
              var rol= localStorage.getItem('rol')
                var number = rol * 2;
              console.log(number)
              if(number<3){
              this.$router.push('/Courses');
              }else{
                this.$router.push('/ViewUser');
              }
            })
            .catch(error => {
              var data = error.response.data;
              console.log(data);
            });

            this.loading = false;
          }
        }
    }
</script>