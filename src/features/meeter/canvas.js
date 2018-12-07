export function rect(props) {
  const { ctx, x, y, width, height, color = 'white' } = props
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

export function getMousePos(canvas, e) {
  const cnvRect = canvas.getBoundingClientRect()
  const x = e.clientX - cnvRect.x
  const y = e.clientY - cnvRect.y
  return { x, y }
}


export function onMouseMove(canvas, e) {
  const { x, y } = getMousePos(canvas, e)
  
}