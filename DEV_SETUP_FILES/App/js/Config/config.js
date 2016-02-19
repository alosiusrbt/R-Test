var config = null;
try {
    $.getJSON('App/js/Config/config.json', function(json) {
        config = json;
    });
} catch(err) {
    console.log("Config file doesnot exist...");
}