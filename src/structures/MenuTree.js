export class MenuNode {
    constructor({ title, link, component }) {
        this.title = title;
        this.link = link;
        this.component = component;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
        return node;
    }
}

export class MenuTree {
    constructor(root) {
        this.root = root;
    }

    traverse(callback, node = this.root) {
        callback(node);
        node.children.forEach((child) => this.traverse(callback, child));
    }

    toRoutes() {
        const routes = [];

        this.traverse((node) => {
            if (node.link && node.component) {
                routes.push({
                    path: node.link,
                    component: node.component,
                    title: node.title
                });
            }
        });

        return routes;
    }

    countNodes() {
        let total = 0;
        this.traverse(() => {
            total += 1;
        });
        return total;
    }
}
