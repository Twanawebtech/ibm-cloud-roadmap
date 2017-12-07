angular
.module('ngSamples')
.filter('samplesFilter', function() {

  return function(listings, tagP){

    var filtered = [];

    console.log('Applying filter', tagP.languages, tagP.categories, tagP.LanChecked, tagP.subCategory);

    angular.forEach(listings, function(listing){

      var keepLink = false;

      // listing should at least one of the tags
      if (tagP.languages.length === 0) {
        keepLink = true;
      } else {
        keepLink = false;
        tagP.languages.forEach(function(language) {
          if (listing.language && listing.language.indexOf(language) >= 0) {
            keepLink = true;
            LanChecked = language;
          }
        });
      }

      // and listing should contain at least one category
      if (keepLink) {
        tagP.subCategory.forEach(function(subCat) {
          if (tagP.subCategory.length > 0) {
            keepLink = (listing.subCategory.indexOf(subCat) >= 0);
          }
        });

        tagP.categories.forEach(function(category) {
          if (tagP.categories.length > 0) {
            keepLink = (listing.category.indexOf(category) >= 0);
          }
        });
      }




      if (keepLink) {
        filtered.push(listing);

      }
      // END - filter by categories and languages


    });

    return filtered;
  }
});
