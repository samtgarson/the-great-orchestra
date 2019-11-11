<template>
  <div v-if="analyser">
    <visualiser :analyser="analyser" :color="color" />
    <button id="stop" @click="stop">Stop</button>
  </div>
  <div class="orchestra" v-else-if="!error">
    <button @click="createMicStream">Use your microphone</button>
    <button @click="createAudioStream">Use an audio file</button>
  </div>
  <p v-else>{{ error }}</p>
</template>

<script>
import getUserMedia from 'get-user-media-promise'
import MicrophoneStream from 'microphone-stream'
import Visualiser from '@/components/visualiser.vue'

export default {
  name: 'orchestra',
  components: { Visualiser },
  data () {
    return {
      analyser: null,
      stream: null,
      error: false
    }
  },
  computed: {
    color () {
      return this.$route.query.color || 'red'
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
#stop {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
