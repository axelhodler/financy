function Finance() {
}

Finance.prototype.encodeQuery = function(query) {
  return encodeURIComponent(query);
};
