<template>
  <div id="app">
    <nav>
      <router-link to="/">All desks</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:300);

body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  font-family: "Lato", sans-serif;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  display: inline;
  padding: 10px;
  background-color: white;
  width: 300px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

a {
  font-weight: bold;
  color: #000000;
  text-decoration: none;

  &.router-link-exact-active {
    color: #000000;
  }
}

.button__add {
  display: flex;
  border-radius: 20px;
  height: 100%;
  background-color: #9BC53D;
  padding: 16px;
  border: 0px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  text-transform: uppercase;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  &:hover{
    color: #FDE74C;
  }
}
</style>
