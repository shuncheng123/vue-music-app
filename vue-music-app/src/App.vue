<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>


<style lang="scss">

@import "./assets/public-style.scss";

html{
  height: 100%;
}
body{
  height: 100%;
  background-color: $content-background;
}
html,body,h1,h2,h3,h4,h5,ul,li,button,p{
  margin: 0;
  padding: 0;
}
#app{
  height: 100%;
}
ul{
  list-style:none;
}



</style>
