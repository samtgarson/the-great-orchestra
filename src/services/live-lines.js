import { LIVE_WIDTH, BYTE_LENGTH, LINE_WIDTH } from '@/constants'
import getColour from '@/services/get-colour'

class LiveLines {
  constructor (two, length, colour) {
    this.two = two
    this.length = length
    this.colour = colour
    this.setup()
  }

  setup () {
    this.lines = []

    const gap = this.two.height / this.length
    for (let i = 0; i < this.length; i++) {
      const y = this.two.height - (gap * i)
      if (y > this.two.height || y < 0) continue

      const line = this.two.makeLine(0, y, LIVE_WIDTH, y)
      line.stroke = 'black'
      line.linewidth = LINE_WIDTH

      this.lines.push(line)
    }
  }

  draw (data) {
    const colour = getColour(this.colour)

    this.lines.forEach((line, i) => {
      const opacity = data[i] / BYTE_LENGTH
      line.stroke = colour(opacity)
    })
  }
}

export default LiveLines
