<template>
    <div>
       <TypeNav></TypeNav>
        <h2>searchword:{{$route.params.searchword}}</h2>
        <h2>keyword:{{keyword}}</h2>
    </div>
</template>

<script>
    export default {
        name: "seacher",
        props:["keyword"]
    }
</script>

<style scoped>

</style>