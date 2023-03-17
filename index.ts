const vertexShaderSource = `#version 300 es

void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 100.0;
}
`;
const fragmentShaderSource = `#version 300 es

precision mediump float;

out vec4 fragColor;

void main() {
  fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const program = gl.createProgram();

// Vertex for points (more programmable version of HTML)
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

// Fragment for the lighting and other stuff (like CSS)
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.log(gl.getShaderInfoLog(vertexShader));
  console.log(gl.getShaderInfoLog(fragmentShaderSource));
}

gl.useProgram(program);

gl.drawArrays(gl.POINTS, 0, 1);
