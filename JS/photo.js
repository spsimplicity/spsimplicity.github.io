/**
 * Created by Simplicity on 5/2/2016.
 */

function Photo(photoData) {
    this.data = photoData;
}

Photo.prototype.getIndex = function() {
    return this.data.lbIndex;
};

// Get the url to retrieve the image from flickr
Photo.prototype.getFlickrPhotoUrl = function() {
    return 'https://farm' + this.data.farm + '.staticflickr.com/' + this.data.server + '/' + this.data.id + '_' +
            this.data.secret + '.jpg';
};

Photo.prototype.createPhotoElem = function() {
    return '' +
        '<div id="' + this.data.id + '" class="photo" onclick="setToLightBox(' + this.data.lbIndex + ')">' +
           '<img src="' + this.getFlickrPhotoUrl() + '"/>' +
        '</div>';
};

Photo.prototype.createPhotoTitle = function() {
    return '<p class="photoTitle">' + this.data.title + '</p>'
};

function testPhotoClass() {
    var testData = {
        "lbIndex": 1,
        "id": "25347626973",
        "owner": "135266784@N04",
        "secret": "0b7a2da595",
        "server": "1514",
        "farm": 2,
        "title": "March Madness",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0,
        "ownername": "ekfotos",
        "dateadded": "1462333850"
    };
    var testPhoto = new Photo(testData);

    console.log('Photo class returns correct index: %s', testData.lbIndex == testPhoto.getIndex());
    console.log('Photo class returns correct flickr url: %s',
        'https://farm' + testData.farm + '.staticflickr.com/' + testData.server + '/' + testData.id + '_' +
        testData.secret + '.jpg' == testPhoto.getFlickrPhotoUrl());
}