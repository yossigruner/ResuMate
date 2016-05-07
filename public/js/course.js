$(document).ready(function () {
  var skills = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
    url: 'skills',
    filter: function(list) {
      return $.map(list, function(skill) {
        return { name: skill }; });
    }
  }
  });
  skills.clearPrefetchCache();
  skills.initialize(true);

  // clear typeahead cache
  //window.localStorage.clear();

  $("#tags").tagsinput({
    typeaheadjs: {
      name: 'skills',
      ttl_ms: 0,
      displayKey: 'name',
      valueKey: 'name',
      source: skills.ttAdapter()
    },
    freeInput: true
  });
});
