<template>
  <div id="app">
    <div id="loader" class="modal-mask">
      <div class="lds-circle">
        <div></div>
      </div>
    </div>
    <nav>
      <router-link to="/">All desks</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Tenor+Sans&display=swap');

html, body {
  margin: 0;
  padding: 0;
}

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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav {
  display: block;
  padding: 10px;
  background-color: white;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  margin: 0 auto;
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

  &:hover {
    color: #FDE74C;
  }
}

.lds-circle,
.lds-circle div {
  color: white;
  box-sizing: border-box;
  position: fixed;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: none;
}

.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}

.lds-circle > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  background: currentColor;
  border-radius: 50%;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
