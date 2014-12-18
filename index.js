function Class() {
    return this;
}

Class.extend = function (child) {
    var parent = this;

    var F = function () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;

    function makeParentConstructor(parent) {
        return function () {
            if (parent.prototype._parent) {
                this._construct = makeParentConstructor(parent.prototype._parent);
            } else {
                delete this._construct;
            }
            var s = parent.apply(this, arguments);
            if (!this.super) {
                this._super = s || new F();
            }
        };
    }

    child.prototype._construct = makeParentConstructor(parent);

    for (var k in parent) {
        child[k] = parent[k];
    }

    child._super = parent;
    child.prototype._self = child;

    return child;
};

module.exports = Class;