<template>
  <div v-if="analyser">
    <visualiser :analyser="analyser" :colour="colour" />
    <div class="controls">
      <select v-model="colour">
        <option :key="option"  v-for="option in colours" :value="option">{{ option }}</option>
      </select>
      <button id="stop" @click="stop">Stop</button>
    </div>
  </div>
  <div class="orchestra" v-else>
    <div class="button" @click="createMicStream">Use your microphone</div>
    <label for="file-input">
      <button>Use an audio file</button>
      <input id="file-input" type="file" accept="audio/*" @change="decodeAudioFile" />
    </label>
    <p class="error" v-if="error">{{ error }} 😞</p>
  </div>
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
    createAnalyser (ctx, source) {
      const analyser = ctx.createAnalyser()

      source.connect(analyser)
      this.analyser = analyser
    },
    async createMicStream () {
      this.error = null
      try {
        const stream = await getUserMedia({ audio: true, video: false})
        this.stream = stream
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const source = ctx.createMediaStreamSource(stream)
        this.createAnalyser(ctx, source)
      } catch (e) {
        this.error = 'Unable to access microphone in this browser.'
      }
    },
    async decodeAudioFile (e) {
      this.error = null
      try {
        const [file] = e.target.files
        const reader = new FileReader()

        const arrayBuffer = await new Promise(resolve => {
          reader.onload = e => { resolve(e.target.result) }
          reader.readAsArrayBuffer(file)
        })

        await this.createAudioStream(arrayBuffer)
      } catch (e) {
        this.error = 'Something went wrong decoding that audio file'
      }
    },
    async createAudioStream (arrayBuffer) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()

      const buffer = await new Promise((resolve, reject) =>
        ctx.decodeAudioData(arrayBuffer, resolve, reject)
      )
      const source = ctx.createBufferSource()
      source.buffer = buffer
      this.createAnalyser(ctx, source)
    },
    stop () {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop())
      }
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

button, .button {
  font-family: inherit;
  font-size: 1rem;
  display: inline-block;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 5px 16px;
  margin: 10px;

  &[disabled] {
    opacity: 0.5;
  }
}

input[type=file] {
  display: none;
}

.error {
  text-align: center;
}
</style>
