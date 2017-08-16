const awesome = function () {
  return {
    $components: {},
    use: function (componentName, fn) {
      // fn.prototype
      this.$components[componentName] = new fn();
    },
    configure: function (componentName) {
      return this.$components[componentName];
    },
    get: function (componentName) {
      const component = this.$components[componentName];
      if (!component.$instance) {
        component.$instance = component.$get();
      }
      return component.$instance;
    },
    init: function (fn) {
      fn && fn.apply(this);
    }
  };
};

export default awesome;
