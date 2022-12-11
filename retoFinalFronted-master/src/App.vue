
<template>
  
  <nav>
    <div class="nav-wrapper teal">
      <ul class="right hide-on-med-and-down" >
        <li id="login"><router-link :to="{name: 'Login'}">Login</router-link></li>
      </ul>
    </div>
  </nav>

  <div class=" white" style="margin-top:30px;  ;width: 100%;">
    <router-view>

    </router-view>
  </div>

  <div class="user-data">
    <label>Usuario: {{name}}</label>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    name(){
      return localStorage.getItem('name')
    },
    id(){
      return localStorage.getItem('id')
    }
  }
}
</script>

<style scoped>
  .user-data
  {
    position:fixed;
    bottom: 0px; left: 0px;
    padding:10px;
    background-color:white;
    border-radius:5px;
    z-index: 2;
  }
</style>