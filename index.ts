const vertexShaderSource = `#version 300 es

uniform float uPSize;
uniform vec2 uPos;

void main() {
  gl_Position = vec4(uPos,0.0,1.0);
  gl_PointSize = uPSize;
}
`;
const fragmentShaderSource = `#version 300 es

precision mediump float;

uniform int uColIndex;
uniform vec4 uColors[4];

out vec4 fragColor;

void main() {
  fragColor = uColors[uColIndex]; 
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

const uPSize = gl.getUniformLocation(program, 'uPSize');
const uPos = gl.getUniformLocation(program, 'uPos');
// const uCol = gl.getUniformLocation(program, 'uCol');
const uColIndex = gl.getUniformLocation(program, 'uColIndex');
const uColors = gl.getUniformLocation(program, 'uColors');
// console.log(uCol, uPSize);

gl.uniform1f(uPSize, 100);
gl.uniform2f(uPos, 0.1, 0.5);

gl.drawArrays(gl.POINTS, 0, 1);

for (let i = 0; i < 100; i++) {
  gl.uniform1f(uPSize, Math.random() * 30);
  gl.uniform2f(uPos, Math.random() * 2 - 1, Math.random() * 2 - 1);
  gl.uniform1i(uColIndex, Math.floor(Math.random() * 4));

  gl.uniform4fv(uColors, [
      1, 0, 0, 1
    , 1, 1, 0, 1 
    , 1, 1, 1, 1
    , 0, 1, 0, 1
  ]);

  gl.drawArrays(gl.POINTS, 0, 1);
}
