

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview  
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');
    // YOUR CODE GOES HERE!
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f56a49e81916642789304326d5bc60df:9:71579088';
 
    //Pass in nytimesURL and an anonymous function into .getJSON
    $.getJSON(nytimesUrl, function(data) {
 
        //set nytHeader text using jQuery
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
 
        //create articles variable that stores data from nytimes
        articles = data.response.docs;
 
        //iterate through data object  which is the response from nytimes for individual articles and append each one to html
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + ' <p>' + article.snippet + '</p>' + '</li>');
        };

}).error(function(e){
    $nytHeaderElem.text("New your times articles could not be loaded");
})
//wikipedia AJAX request goes here
var wikiUrl = 'http://en.wikipXXXedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
$.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    // jsonp: "callback",
    success: function(response) {
        var articleList = response[1];

        for ( var i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
        };
        clearTimeout(wikiRequestTimeout);
    }
})

    return false;
}
$('#form-container').submit(loadData);

