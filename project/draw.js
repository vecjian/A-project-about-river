/*绘制河网
 *设置vs 和 fs
 */

//vertex shader
var v_Shader = `
attribute vec4 a_Position;
void main(){
gl_Position = a_Position;
}`;

//fragment shader
var f_Shader = `
precision mediump float;
uniform vec4 u_color;
void main(){
    gl_FragColor = u_color;
}`;

//draw a stroke
//para:thewidest，the narrowest. the points array
function drawAStroke(head_width, tail_width, arr) {}

// splite the line to two strips