import Two from 'two.js'
import { LIVE_WIDTH, BYTE_LENGTH, LINE_WIDTH } from '@/constants'
import getColour from '@/services/get-colour'

class SoundGroup {
  constructor (two, data, colour) {
    this.data = data
    this.two = two
    this.colour = colour
    this.setup()
  }

  setup () {
    this.group = this.two.makeGroup()
    const gap = this.two.height / this.data.length
    const colour = getColour(this.colour)

    for (let i = 0; i < this.data.length; i++) {
      const y = this.two.height - (gap * i)
      if (this.data[i] < 2) continue

      const line = new Two.Line(LIVE_WIDTH, y, LIVE_WIDTH + 3, y)
      this.group.add(line)

      const opacity = this.data[i] / BYTE_LENGTH
      line.stroke = colour(opacity)
      line.linewidth = LINE_WIDTH
    }
  }

  draw () {
    this.group.translation.addSelf(this.constructor.velocity)
  }
}

SoundGroup.velocity = new Two.Vector(2, 0)

export default SoundGroup

