/* jshint asi: true */
$(function() {
  var searches = localStorage["omnikey.searches"]
  if (searches) {
    searches = searches.split(":")
  } else {
    searches = []
  }

  for(var i in searches) {
    var searchKey = searches[i],
        searchUrl = localStorage['omnikey.search.' + searchKey];

    showSearch(searchKey, searchUrl);
  }

  function showSearch(key, value) {
    $('#no-sites').remove()
    $("#sites-table tbody").append("<tr>" +
                                     "<td>" + key + "</td>" +
                                     "<td>" + value + "</td>" +
                                   "</tr>");
  }

  function addSearch(key, value) {
    if(localStorage["omnikey.search." + key]) {
      localStorage["omnikey.search." + key] = value
      return;
    }

    var searches = localStorage["omnikey.searches"]
    if (searches) {
      localStorage["omnikey.searches"] = searches + ":" + key
    } else {
      localStorage["omnikey.searches"] = key
    }
    localStorage["omnikey.search." + key] = value

    showSearch(key,value);
  }

  $("form#add-site").on("submit", function(e) {
    e.preventDefault();
    var form = $(this),
        searchKey = $('input#search-key', form).val(),
        searchUrl = $('input#search-url', form).val();

    // Clear the form
    $('input#search-key', form).val(""),
    $('input#search-url', form).val("");

    if(searchKey && searchUrl) {
      console.log("Adding search:", searchKey, searchUrl);
      addSearch(searchKey, searchUrl);
      $(".error").hide();
    } else {
      console.log("There was an error");
      $(".error").show();
    }
  })
});
