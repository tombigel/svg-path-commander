export default function(x, y, rad) {
  const X = x * Math.cos(rad) - y * Math.sin(rad), 
        Y = x * Math.sin(rad) + y * Math.cos(rad);
  return {x: X, y: Y}
}