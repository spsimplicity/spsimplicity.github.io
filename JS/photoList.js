/**
 * Created by Simplicity on 5/2/2016.
 */

var photoList = [],
    lightBoxImage;

runTests();

window.onload = function() {
    
    // Request the images and start setting them up
    imageRequest('flickr', function(flckrResponse) {
        
        // Make sure we actually have photos to use
        if(flckrResponse.photos && parseInt(flckrResponse.photos.total) > 0) {
            flckrResponse.photos.photo.forEach(function(photo, idx) {
                
                photo.lbIndex = idx; // Set to keep track of the image location
                
                var newPhoto = new Photo(photo);
                
                photoList.push(newPhoto);
                
                // Build all the html for each image
                document.querySelector('.photoList').innerHTML += newPhoto.createPhotoElem();
            });
        } else {
            // Show the error to the user
            document.querySelector('.photoError').innerText = flckrResponse;
            document.querySelector('.photoError').className += ' show';
        }
    });
};

function prevLightBoxImage() {
    setToLightBox(lightBoxImage.getIndex() - 1);

    // Check if we should show the next button
    if(lightBoxImage.getIndex() < photoList.length-1) {
        document.querySelector('.move.next').className = 'move next';
    }
}

function nextLightBoxImage() {
    setToLightBox(lightBoxImage.getIndex() + 1);

    // Check if we should show the previous button
    if(lightBoxImage.getIndex() > 0) {
        document.querySelector('.move.prev').className = 'move prev';
    }
}

function setToLightBox(idx) {
    lightBoxImage = photoList[idx];
    document.querySelector('.lightBox .selected').innerHTML = lightBoxImage.createPhotoTitle() + lightBoxImage.createPhotoElem();
    
    // Only add the class if we need to
    if(document.querySelector('.lightBox').className.indexOf('show')  == -1) {
        document.querySelector('.lightBox').className += ' show';
    }

    // Check if we need to hide the previous button
    if(lightBoxImage.getIndex() == 0 && document.querySelector('.move.prev').className.indexOf('hide') == -1) {
        document.querySelector('.move.prev').className += ' hide';
    }

    // Check if we need to hide the next button
    if(lightBoxImage.getIndex() == photoList.length-1 && document.querySelector('.move.next').className.indexOf('hide') == -1) {
        document.querySelector('.move.next').className += ' hide';
    }
}

// Reset classes when closing light box
function closeLightBox(evnt) {
    document.querySelector('.lightBox').className = 'lightBox';
    document.querySelector('.move.prev').className = 'move prev';
    document.querySelector('.move.next').className = 'move next';
}

function runTests() {
    testImageRequest();
    testPhotoClass();
}