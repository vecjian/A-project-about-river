//利用二叉树重建河网拓扑结构
// 二叉树的节点为每一个河段
// 河段指的是从河源到汇口之间或者汇口和汇口之间的河流段

function getMapStructure(data) {
    let strokes = [];

    // 河段类，包含起止节点、ID、Length、level等属性
    function Stroke() {
        this.id = null;
        this.LengthKM = null;
        this.fromNode = null;
        this.toNode = null;
        this.points = [];
        this.level = null;
    }

    function loadFile(data) {
        let features = data.features;
        let len = features.length;
        for (let i = 0; i < len; i++) {
            let stroke = new Stroke();
            let line = data.features[i];
            console.log(line.properties.ComID);
            stroke.id = line.properties.ComID;
            stroke.LengthKM = line.properties.LengthKM;
            stroke.fromNode = line.properties.FromNode;
            stroke.toNode = line.properties.ToNode;
            stroke.level = line.properties.StreamLeve;
            stroke.points = line.geometry.coordinates;
            strokes.push(stroke);
        }
    }

    loadFile(data);
    return strokes;
}

// 节点数据结构
function Node(stroke = null, v = false) {
    //数据
    //this.id = null;
    if (stroke == null) {
        this.LengthKM = -1;
        this.points = [];
        this.level = -1;
    } else {
        this.LengthKM = stroke.LengthKM;
        this.points = stroke.points;
        this.level = stroke.level;
    }

    //标签
    this.virtual = v;
    //关系
    this.parent = null;
    this.left = null;
    this.right = null;

    this.depth = 0;
}

let stroke_array = getMapStructure(originData);

function BinaryTree(root) {
    this.root = root;

    function newTree(pNode) {
        //找孩子
        let children = []; //存储孩子
        for (let i = 0; i < stroke_array.length; i++) {
            let stroke = stroke_array[i];
            if (stroke.toNode == pNode.fromNode) {
                //新建节点
                let node = new Node(stroke, false);
                node.depth = pNode.depth + 1;
                children.push(node);
            }
        }

        //更新孩子
        if (children.length == 0) {
            return;
        } else if (children.length == 1) {
            pNode.left = children[0];
            children[0].parent = pNode;
            newTree(children[0]);
        } else if (children.length == 2) {
            //双孩子
            pNode.left = children[0];
            children[0].parent = pNode;
            pNode.right = children[1];
            children[1].parent = pNode;
            newTree(children[0]);
            newTree(children[1]);
        } //构造虚拟孩子
        else {
            let children = newVirtualNodes(pNode, children);
            for (let i = 0; i < children.length; i++) {
                newTree(children[i]);
            }
        }
    }

    function newVirtualNodes(parent, children) {
        //判断需要的虚节点的数量
        minVirNum = Math.floor(children.length / 2) * 2;

        let nodes = [];
        let stroke = null;
        for (let i = 0; i < minVirNum; i++) {
            let virNode = new Node(stroke, true);
            nodes.push(virNode);
        }
        nodes.push.apply(nodes, children); //将children拼接到nodes
        let currParent = parent; //当前父亲
        //配对关系
        for (let i = 0; i < nodes.length; i += 2) {
            nodes[i].parent = currParent; //更新父亲
            currParent.left = nodes[i]; //更新左孩子
            currParent.right = nodes[i + 1]; //更新右孩子
            nodes[i].depth = currParent.depth + 1; //更新深度

            if (i >= nodes.length - 1) break; //指针抵达最后一个元素，防止i+1超出索引
            nodes[i + 1].parent = currParent; //更新父亲
            currParent.right = nodes[i + 1]; //更新孩子
            nodes[i + 1].depth = currParent.depth + 1; //更新深度
            currParent = nodes[i / 2 - 1]; //更新当前父亲
        }
        //返回孩子节点
        return nodes.slice(minVirNum, nodes.length);
    }

    //绘制树
    function DrawTree() {
        DrawNode(root);
    }

    //遍历绘制
    function DrawNode(node) {
        if (node == null) return; //递归基
        if (!node.virtual) Draw(node.points, node.depth); //绘制自身
        if (node.left != null) {
            DrawNode(node.left);
        }
        if (node.right != null) {
            DrawNode(node.right);
        }
    }

    //绘制一根线
    function Draw(points, depth) {}

    //存在虚拟节点时，构造含有虚拟节点的树
    function constructTreeWithVirtualNode(node) {
        let virtual = new Node();
        if (array.length > 2) {
            root.left = virtual;
            array = array.splice(0, 1);
            constructTreeWithVirtualNode(root.right, array);
        }
    }

    //遍历子树的叶子结点
}

//构造森林
function Forest() {
    var treeNum = 0; //树数量
    var trees = [];

    function newForest(stroke_array) {
        // 找树根
        for (let i = 0; i < stroke_array.length; i++) {
            let candRoot = stroke_array[i]; //候选树根
            let realRoot = true;
            for (let j = 0; j < stroke_array.length; j++) {
                let stroke = stroke_array[j];
                if (stroke.toNode == candRoot.fromNode) {
                    realRoot = false;
                    break;
                }
            }
            if (realRoot) {
                var tree = new BinaryTree(candRoot);
                tree.newTree(candRoot); //计算树左右孩子
                trees.push(tree);
            }
        }
    }

    //计算树数量
    function TreeCount() {
        return trees.length;
    }

    function GetTree(id) {
        if (id > 0 && id < trees.length) return trees[id];
        else return null;
    }

    function DrawFrest() {
        //绘制树木
        for (let i = 0; i < trees.length; i++) {
            tree = trees[i];
            tree.DrawTree();
        }
        //刷新屏幕
    }
}