function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  function runCallback(passedArgs) {
    callback.apply(null, passedArgs);
  }
  function debounced() {
    const currentArgs = Array.prototype.slice.call(arguments);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(runCallback, timeoutDelay, currentArgs);
  }
  return debounced;
}

export { debounce };
