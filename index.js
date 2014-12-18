function Class() {
    return this;
}

Class.extend = function (child) {
    var parent = this;

    var F = function () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.prototype._parent = parent;

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

    return child;
};

module.exports = Class;