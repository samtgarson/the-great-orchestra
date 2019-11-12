<template>
  <div class="visualiser" />
</template>

<script>
import Two from 'two.js'
import { FFT_SIZE, LIVE_WIDTH } from '@/constants'
import LiveLines from '@/services/live-lines'
import SoundGroup from '@/services/sound-group'

const params = { fullscreen: true, type: Two.Types.svg }
const two = new Two(params)
let dataArray
let liveLines
let soundGroups = []

export default {
  name: 'visualiser',
  props: ['analyser', 'colour'],
  data () {
    return {
      bufferLength: 0
    }
  },
  mounted () {
    this.analyser.fftSize = FFT_SIZE;
    this.bufferLength = this.analyser.frequencyBinCount
    dataArray = new Uint8Array(this.bufferLength)

    two.bind('resize', this.setup)
    two.bind('update', this.draw)
    
    this.setup()
    two.appendTo(this.$el).play()
  },
  beforeDestroy () {
    two.unbind('resize', this.setup)
    two.unbind('update', this.draw)
    two.clear()
    dataArray = null
    liveLines = null
    soundGroups = []
  },
  watch: {
    colour () { this.setup() }
  },
  methods: {
    getGap () {
      return getGap(this.bufferLength)
    },
    setup () {
      two.clear()

      liveLines = new LiveLines(two, this.bufferLength, this.colour)
      this.drawDivider()
    },
    draw () {
      this.analyser.getByteFrequencyData(dataArray)
      liveLines.draw(dataArray, this.color)

      for (let i=0; i < soundGroups.length; i++) {
        const g = soundGroups[i]
        g.draw()

        if (g.group.translation.x > two.width) {
          two.scene.remove(g.group)
          soundGroups.splice(i, 1)
        }
      }

      if (two.frameCount % 2 !== 0) return
      const index = soundGroups.length
      soundGroups.push(new SoundGroup(two, dataArray, this.colour))
    },
    drawDivider () {
      const line = two.makeLine(LIVE_WIDTH, 0, LIVE_WIDTH, two.height)
      line.stroke = 'white'
      line.linewidth = 1
    }
  }
}
</script>

