import Polyline from './Polyline'
import Cesium from 'cesium/Source/Cesium.js'
import * as mu from '../mapUtil.js'
import Bezier from 'bezier-js'
import _ from 'lodash'

export default class BezierN extends Polyline {

  constructor(maxPoint) {
    super()
    if (maxPoint) {
      this.maxPointNum = maxPoint
    }
  }

  calcuteShape (points, time) {
    if (points.length < 2) {
      return points.map((p) => p.position.getValue(time))
    } else {
      let linestr = points.map((p) => mu.cartesian2lonlat(p.position.getValue(time)))
      let lonlat = linestr.map(p => {return {x: p[0], y: p[1]}})
      let curvePoints = new Bezier(lonlat).getLUT()
      return curvePoints.map((p) => mu.lonlat2Cartesian([p.x, p.y]))
    }
  }
}