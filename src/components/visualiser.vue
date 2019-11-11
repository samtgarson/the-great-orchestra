<template>
  <div class="visualiser" />
</template>

<script>
import Two from 'two.js'
import getColour from '@/services/get-colour'

const BYTE_LENGTH = 255
const LIVE_WIDTH = 250
const FFT_SIZE = 1024

const params = { fullscreen: true, type: Two.Types.canvas }
const two = new Two(params)
let dataArray
let liveLines

export default {
  name: 'visualiser',
  props: ['analyser', 'color'],
  data () {
    return { bufferLength: 0, running: true }
  },
  mounted () {
    this.analyser.fftSize = FFT_SIZE;
    this.bufferLength = this.analyser.frequencyBinCount
    dataArray = new Uint8Array(this.bufferLength)

    two.bind('resize', () => this.setup())
    two.bind('update', () => this.draw())
    
    this.setup()
    two.appendTo(this.$el).play()
  },
  methods: {
    getGap () {
      const EXPO_FACTOR = 0.9999
      const gap = (two.height / this.bufferLength) * 1.3

      return i => i * (gap * Math.pow(EXPO_FACTOR, i))
    },
    setup () {
      two.clear()

      this.drawDivider()
      this.generateLiveLines()
    },
    generateLiveLines () {
      liveLines = []

      const gapper = this.getGap()
      for (let i = 0; i < this.bufferLength; i++) {
        const y = two.height - gapper(i)

        const line = two.makeLine(0, y, LIVE_WIDTH, y)
        line.stroke = 'black'
        line.linewidth = 1

        liveLines.push(line)
      }
    },
    draw () {
      this.drawLive()
    },
    drawDivider () {
      const line = two.makeLine(LIVE_WIDTH, 0, LIVE_WIDTH, two.height)
      line.stroke = 'white'
      line.linewidth = 0.5
    },
    drawLive () {
      this.analyser.getByteFrequencyData(dataArray)
      
      const colour = getColour(this.color)

      for (let i = 0; i < this.bufferLength; i++) {
        const opacity = dataArray[i] / BYTE_LENGTH
        liveLines[i].stroke = colour(opacity)
      }
    }
  }
}
</script>

