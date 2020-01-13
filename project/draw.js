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

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /*
                        static nomarlize(m) {
                            let len = Math.sqrt(this.x * this.x + this.y * this.y);
                            this.x = this.x / len;
                            this.y = this.y / len;
                            return this;
                        }*/

    normalize(m) {
        let len = Math.sqrt(this.x * this.x + this.y * this.y);
        let x = m.x / len;
        let y = m.y / len;
        let vec = new Point(x, y);
        return vec;
    }

    static addVector(m, n) {
        let x = m.x + n.x;
        let y = m.y + n.y;
        let v = new Point(x, y);

        return v;
    }

    //叉乘
    static mutiply(m, n) {
        this.x = m.x * n.y;
        this.y = m.y * n.x;

        return this;
    }

    //点乘
    static dot(m, n) {
        return m.x * n.x + m.y * m.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }
}

//需要判断是否渐变，并写出渐变函数
function generatePoints(pts, lineWidth) {
    if (pts.length < 2 || pts === undefined) {
        return undefined;
    }

    let pts1 = []; //左插值点
    let pts2 = []; //右插值点
    let len = pts.length;

    //起点插值
    let x = pts[1].x - pts[0].x;
    let y = pts[1].y - pts[0].y;

    //v1:point法向量
    let v1 = new Point(-y, x);
    // let v2 = new Point();

    //方向向量
    let v2 = Point.normalize(v1);

    x = v2.x * linewidth + pts[0].x;
    y = v2.y * linewidth + pts[0].y;
    let v3 = new Point(x, y);
    pts1.push(v3);

    x = pts[0].x - v2.x * lineWidth;
    y = pts[0].y - v2.y * lineWidth;
    let v4 = new Point(x, y);
    pts2.push(v4);

    //中间点
    for (let i = 1; i < pts.length - 1; i++) {
        x = pts[i + 1].x - pts[i].x;
        y = pts[i + 1].y - pts[i].y;
        let vec2 = new Point(x, y);

        x = pts[i].x - pts[i - 1].x;
        y = pts[i].y - pts[i - 1].y;
        let vec1 = new Point(x, y);

        let nor1 = Point.normalize(vec1);
        let nor2 = Point.normalize(vec2);

        let vec3 = Point.addVector(vec1, vec2);
        vec3 = Point.normalize(vec3);

        let normal = new Point(-nor1.y, nor1.x);
        let miter = new Point(-vec3.y, vec3.x);

        let angle_len = lineWidth(Point.dot(normal, miter));

        let point1 = new Point(
            miter.x * angle_len + pts[i].x,
            miter.y * angle_len + pts[i].y
        );
        pts1.push(point1);
        let point1 = new Point(
            pts[i].x - miter.x * angle_len,
            pts[i].y - miter.y * angle_len
        );
        pts2.push(point2);
    }
    //计算终止节点处插值
    let x = pts[len - 1].x - pts[len - 2].x;
    let y = pts[len - 1].y - pts[len - 2].y;

    //v1:point法向量
    let v4 = new Point(-y, x);

    //方向向量
    let v5 = Point.normalize(v1);

    x = v5.x * linewidth + pts[len - 1].x;
    y = v5.y * linewidth + pts[len - 1].y;
    let v = new Point(x, y);
    pts1.push(v);

    x = pts[len - 1].x - v5.x * lineWidth;
    y = pts[len - 1].y - v5.y * lineWidth;
    let vec = new Point(x, y);
    pts2.push(vec);

    // 按照三角形串存储坐标
    let position = [];
    for (var i = 0; i < len - 1; i++) {
        position.push(pts1[i]);
        position.push(pts2[i]);
        position.push(pts1[i + 1]);

        position.push(pts2[i]);
        position.push(pts2[i + 1]);
        position.push(pts1[i + 1]);
    }

    return position;
}

//点转换成Point
function convertPts(pts) {
    let len = pts.length;
    let points = [];
    for (let i = 0; i < len; i++) {
        let x = pts[i][0];
        let y = pts[i][1];
        let pt = new Point(x, y);
        points.push(pt);
    }
    return points;
}

class Boundary() {
    constructor boundary(maxX, minX, maxY, minY) {
        this.maxX = maxX;
        this.minX = minX;
        this.maxY = maxY;
        this.minY = minY;
    }


}