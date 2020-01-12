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

//para:thewidest，the narrowest. the points array
function drawAStroke(head_width, tail_width, arr) {}

// splite the line to two strips

//compute coordinates of insert points
/*
    params:
        pts :an array of line point
        lineWidth :double
        isGradient : bool

    returns:
        array : a array of THREE.Vector2 that construct for a triangle
*/

function generatePoints(pts, lineWidth) {
    if (pts.length < 2 || pts === undefined) {
        return undefined;
    }

    let pts1 = [];
    let pts2 = [];
    let len = pts.length;
    let x = pts[1].x -

}

//点转换成THREE.Vector2
function convertPts(pts) {
    let
}