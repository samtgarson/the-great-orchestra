import interpolate from 'color-interpolate'

const colours = {
  blue: ['#000000', '#020D33', '#0416FC', '#01FEFE', '#FEFFFF'],
  red: ['#000000', '#29161F', '#FD341F', '#FFFC91', '#FFFFFF']
}

export default key => interpolate(colours[key])
