<template>
  <div id="app">
    <div id="info" v-if="showInfo" @click="showInfo = false">
      <p>This is a Web Audio experiment, inspired by UVA's <a href="https://www.uva.co.uk/features/great-animal-orchestra">The Great Animal Orchestra</a> which I saw at 180 The Strand in November of 2019.</p>
      <p>Built with 🤍 by <a href="http//samgarson.com">Sam Garson</a>, a digital product nerd living in London.</p>
    </div>
    <nav>
      <a @click="showInfo = !showInfo"><InfoIcon size="1x" /></a>
      <a href="https://twitter.com/samtgarson"><TwitterIcon size="1x" /></a>
      <a href="https://github.com/samtgarson/the-great-orchestra"><GithubIcon size="1x" /></a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { InfoIcon, TwitterIcon, GithubIcon } from 'vue-feather-icons'
export default {
  components: { InfoIcon, TwitterIcon, GithubIcon },
  data () {
    return { showInfo: false }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'uni';
  src: url('assets/fonts/uni0553-webfont.eot?#iefix') format('embedded-opentype'),
       url('assets/fonts/uni0553-webfont.woff') format('woff'),
       url('assets/fonts/uni0553-webfont.ttf')  format('truetype');
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  color: white;
  font-family: uni, sans-serif;
  font-size: 16px;
}

nav {
  position: absolute;
  right: 0;
  top: 0;
  padding: 14px 4px;
  z-index: 10;

  a {
    margin: 0px 10px;
    color: white;
  }
}

#info {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;;
  align-items: center;
  background-color: rgba(black, 0.8);

  p {
    max-width: 350px;
    line-height: 1.5rem;
    margin: 0 auto 20px;
    text-align: center;
  }

  a {
    color: white;
  }
}
</style>
