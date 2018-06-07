export default {
    mapTree(tree, path, fn) {
        let li = [];
        let children = tree instanceof Array ? tree : tree.children;
        for (let i = 0; i < path.length; i++) {
            if (!(children instanceof Array)) return li;
            let child = children[path[i]];
            li[i] = fn ? fn(child, i) : child;
            children = child.children;
        }
        return li;
    }
};