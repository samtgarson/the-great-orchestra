import interpolate from 'color-interpolate'

export const colours = {
  blue: ['#000000', '#020D33', '#0416FC', '#01FEFE', '#FEFFFF', '#FFFFFF'],
  red: ['#000000', '#29161F', '#FD341F', '#FFFC91', '#FFFFFF']
}

export default key => interpolate(colours[key])
