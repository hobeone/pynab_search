function pynab_url() {
  return 'http://192.168.1.5:8077/api?';
}


function pynab_alert (message) {
    $('#alert-wrapper').append(
        '<div class="alert alert-danger" data-dismiss="alert">'+
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
            message+
        '</div>');
}

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

$(document).ready(function() {
    /* navbar handling. */
    $('.navbar-nav a').on('click', function(e) {
        e.preventDefault();
        /* Disable active on all menu items. */
        $(this).parent().parent().find('.active').removeClass('active');
        $('.nav').find('.active').removeClass('active');
        /* Enable active on the current menu. */
        $(this).parent().addClass('active');
        /* Hide the previous content. */
        $('.content').hide();
        /* Show the current active content. */
        $($(this).attr('href')).show();

        if ($(this).attr('href') == '#search') {
            $('#search_string').focus();
        }
    });

});
