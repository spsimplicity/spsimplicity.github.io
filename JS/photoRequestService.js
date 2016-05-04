/**
 * Created by Simplicity on 4/30/2016.
 */

// Service to request images from the given url
function imageRequest(apiToUse, callback) {

    // Keep track of all of the apis we might call
    var apis = {
        flickr: {
            // Keep track of the methods to get photos
            groups_pools: {
                method:   'flickr.groups.pools.getPhotos',
                api_key:  '60474ccbbca38d54e49d0e1b09f940f5',
                secret:   'c18f3a11afece75b',
                format:   'json',
                group_id: '859988@N22', // I like skylines a lot
                per_page: 50,
                page:     1,
                media:    'photos',
                nojsoncallback: 1
            },
            // If I wanted to support other methods just need to fill these out
            photosets: {},
            galleries: {}
        },
        // If I wanted to support other apis just need to fill these out
        google: {},
        facebook: {}
    };
    var httpRequest = new XMLHttpRequest();

    // Select api to use
    switch(apiToUse) {
        case "flickr":
            // The default method to use in the group_pools (could set it up for others)
            httpRequest.onreadystatechange = flickrResponse;
            httpRequest.open('GET', buildFlickerUrl('groups_pools'), true);
            httpRequest.send(null);
            break;
        case "google":
            // Fill in for google
            callback('Photos not able to be retrieved for that api');
            break;
        case "facebook":
            // Fill in for facebook
            callback('Photos not able to be retrieved for that api');
            break;
        default:
            callback('Photos not able to be retrieved for that api');
            break;
    }

    // Setup the url to retrieve photos from flicker
    function buildFlickerUrl(method) {
        var baseUrl = 'https://api.flickr.com/services/rest/?';

        // Turn method object into a string and format it into url parameters
        baseUrl += JSON.stringify(apis.flickr[method]).replace(/:+/g, '=').replace(/"+/g, '').replace(/,+/g, '&').replace(/[\{|\}|"]+/g, '');

        return baseUrl;
    }

    // Handle the response from the flickr api call
    function flickrResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            var parsedRespone = JSON.parse(httpRequest.responseText);
            if (httpRequest.status === 200) {
                if(parsedRespone.stat && parsedRespone.stat == 'fail') {
                    callback(parsedRespone.message);
                } else {
                    callback(parsedRespone);
                }
            } else {
                callback('There was an error retrieving the photos. Please try again');
            }
        }
    }
}

// Tests for imageRequest service
function testImageRequest() {
    imageRequest(null, function(response) {
        console.log('No photos exist for null api: %s', response == "Photos not able to be retrieved for that api");
    });
    imageRequest('google', function(response) {
        console.log('No photos exist for Google api: %s', response == "Photos not able to be retrieved for that api");
    });
    imageRequest('facebook', function(response) {
        console.log('No photos exist for Facebook api: %s', response == "Photos not able to be retrieved for that api");
    });
    imageRequest('flickr', function(response) {
        console.log('Photos exist for Flickr api: %s', typeof response == "object");
    });
}