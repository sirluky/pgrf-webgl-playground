const vertexShaderSource = `#version 300 es

in float aPSize;
in vec2 aPos;
in vec3 aColor;

out vec3 vColor;

void main() {
  vColor = aColor;

  gl_Position = vec4(aPos,0.0,1.0);
  gl_PointSize = aPSize;
}
`;
const fragmentShaderSource = `#version 300 es

precision mediump float;

in vec3 vColor;

out vec4 fragColor;

void main() {
  fragColor = vec4(vColor,1.0);
}

`;
/*

uniform int uColIndex;
uniform vec4 uColors[4];


void main() {
  fragColor = uColors[uColIndex]; 
}
*/

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

// Atributes are better because you can use them more effectively and often (but only in vertex shader)
const aPSize = gl.getAttribLocation(program, 'aPSize');
const aPos = gl.getAttribLocation(program, 'aPos');
const aColor = gl.getAttribLocation(program, 'aColor');


console.log({aPSize,aPos,aColor})

gl.enableVertexAttribArray(aPSize);
gl.enableVertexAttribArray(aPos);
gl.enableVertexAttribArray(aColor);

const bufferData = new Float32Array([
  -0.2,-0.5,        100,   1,0,0,
  0.7,-0.1,        20,   0,1,0,
  -0.3,0.6,        50,   0.4,0.7,1,
])

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER,bufferData, gl.STATIC_DRAW)

gl.vertexAttribPointer(aPSize,1,gl.FLOAT,false,6*4,2*4)
gl.vertexAttribPointer(aPos,2,gl.FLOAT,false,6*4,0)
gl.vertexAttribPointer(aColor,3,gl.FLOAT,false,6*4,3*4)

gl.drawArrays(gl.TRIANGLES, 0, 3);

// OLD UNIFORM
// const uCol = gl.getUniformLocation(program, 'uCol');
// const uColIndex = gl.getUniformLocation(program, 'uColIndex');
// const uColors = gl.getUniformLocation(program, 'uColors');

// gl.uniform1f(aPSize, 100);
// gl.uniform2f(aPos, 0.1, 0.5);

// gl.drawArrays(gl.POINTS, 0, 1);

// for (let i = 0; i < 100; i++) {
//   gl.uniform1f(aPSize, Math.random() * 30);
//   gl.uniform2f(aPos, Math.random() * 2 - 1, Math.random() * 2 - 1);
//   gl.uniform1i(uColIndex, Math.floor(Math.random() * 4));

//   gl.uniform4fv(uColors, [
//       1, 0, 0, 1
//     , 1, 1, 0, 1 
//     , 1, 1, 1, 1
//     , 0, 1, 0, 1
//   ]);

//   gl.drawArrays(gl.POINTS, 0, 1);
// }
