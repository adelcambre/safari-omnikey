// jshint asi: true

var createUrl = function(url, query) {
    return url.replace(/\{search\}/g, query)
}

var handleQuery = function(e) {
  var searches, url;
  if(searches = localStorage["omnikey.searches"]) {
    var full_query = e.query
    var parts = full_query.split(' ')
    var key = parts[0]
    var query = parts.splice(1).join(' ')

    if(url = localStorage["omnikey.search." + key]) {
      e.preventDefault()
      e.target.url = createUrl(url, query)
    } else if(key[0] === '!') {
      e.preventDefault()
      e.target.url = createUrl("https://google.com/search?q={search}", full_query.slice(1))
    }
  }
}

safari.application.addEventListener("beforeSearch", handleQuery, false)
