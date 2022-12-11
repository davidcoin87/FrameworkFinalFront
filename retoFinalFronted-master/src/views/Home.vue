<template>
    <div class="row">
    <h1>Bienvenido</h1>
    <hr>
    {{courses}}
    </div>
</template>

<script>
    export default{
        async mounted()
        {
            await this.axios.get('/courses')
            .then(response => {
                this.courses = response.data;
            });
        },
        data(){
            return {
                courses: []
            }
        }
    }
</script>