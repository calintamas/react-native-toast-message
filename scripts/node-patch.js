// Make `global.performance` writable so react-native's jest setup can assign to
// it (Node 18+ makes it read-only otherwise).
Object.defineProperty(global, 'performance', {
  value: global.performance,
  writable: true,
  configurable: true
});
