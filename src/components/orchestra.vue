<template>
  <div v-if="analyser">
    <visualiser :analyser="analyser" :colour="colour" />
    <div class="controls">
      <select v-model="colour">
        <option v-for="option in colours" :value="option">{{ option }}</option>
      </select>
      <button id="stop" @click="stop">Stop</button>
    </div>
  </div>
  <div class="orchestra" v-else-if="!error">
    <button @click="createMicStream">Use your microphone</button>
    <button disabled @click="createAudioStream">Use an audio file</button>
  </div>
  <p v-else>{{ error }}</p>
</template>

<script>
import getUserMedia from 'get-user-media-promise'
import MicrophoneStream from 'microphone-stream'
import Visualiser from '@/components/visualiser.vue'
import { colours } from '@/services/get-colour'

export default {
  name: 'orchestra',
  components: { Visualiser },
  data () {
    return {
      analyser: null,
      stream: null,
      error: false,
      colour: 'blue',
      colours: Object.keys(colours)
    }
  },
  methods: {
    async createStream (stream) {
      try {
        this.stream = stream
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const source = ctx.createMediaStreamSource(stream)
        const analyser = ctx.createAnalyser()

        source.connect(analyser)
        this.analyser = analyser
      } catch (e) {
        this.error = 'Unable to access microphone in this browser.'
      }
    },
    async createMicStream () {
      const stream = await getUserMedia({ audio: true, video: false})
      return this.createStream(stream)
    },
    createAudioStream () {
      console.log('not implemented')
    },
    stop () {
      this.stream.getTracks().forEach(track => track.stop())
      this.analyser.context.close()
      this.analyser = null
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;

  * {
    margin-top: 10px;
  }
}
</style>
