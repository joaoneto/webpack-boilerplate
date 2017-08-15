const awesome = function () {
  // var initComponents = function (components) {
  //   for (let name in components) {
  //     components[name].$instance = components[name].$factory.apply(components[name].$factory);
  //   }
  // };

  return {
    $components: {},
    use: function (component) {
      this.$components[component.name] = component;
    },
    configure: function (componentName) {
      return this.$components[componentName].$factory;
    },
    get: function (componentName) {
      return this.$components[componentName].$instance;
    },
    init: function (fn) {
      // initComponents(this.$components);
      fn && fn.apply(this);
    }
  };
};

export default awesome;

export class Component {
  constructor(name, factory) {
    this.name = name;
    this.$factory = factory.apply(factory);
    return this;
  }
};
