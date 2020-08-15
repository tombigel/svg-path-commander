import pathToCurve from '../convert/pathToCurve.js';
import pathToAbsolute from '../convert/pathToAbsolute.js';
import reverseCurve from './reverseCurve.js';

export default function(pathArray){
  let curveSegments = pathToCurve(pathArray),
      isClosed = pathToAbsolute(pathArray).isClosed,
      result = [],
      pathCommand,
      x1, y1, x2, y2, x, y

  return reverseCurve(curveSegments).map((p,i)=>{
    x1 = p[1]; y1 = p[2]; 
    x2 = p[3]; y2 = p[4]; 
    x  = p[p.length - 2]; 
    y  = p[p.length - 1];

    if (p.length === 3) {
      pathCommand = 'M'
    } else if (y1===y2===y) {
      pathCommand = 'H'
    } else if (x1===x2===x) {
      pathCommand = 'V'
    } else if ( x2===x && y2===y ) {
      pathCommand = 'L'
    } else {
      pathCommand = p[0]
    }

    switch(pathCommand) {
      case 'M':
        result = ['M', x,y]
        break;
      case 'L':
        result = [pathCommand, x,y]
        break;
      case 'V':
        result = [pathCommand, y]
        break;
      case 'H':
        result = [pathCommand, x]
        break;
      case 'Z':
        result = [pathCommand]
        break;
      case 'C':
      default:
        result = [pathCommand,x1,y1,x2,y2,x,y]
    }
    return result
  }).concat(isClosed && [['Z']])
}