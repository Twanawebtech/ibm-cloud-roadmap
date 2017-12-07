angular
    .module('ngSamples')
    .controller('samplesController', function ($scope, samplesFactory, $cookieStore, $rootScope, ngDialog) {

        $scope.samples = [];
        $scope.randomP = [];
        $scope.tagP = {
            all: "live",
            enabled: true,
            languages: [],
            categories: [],
            subCategory: []
        };


        function toggleTag(tagSet, tag) {
            var position = tagSet.indexOf(tag);
            if (position >= 0) {
                tagSet.splice(position, 1);
            } else {
                tagSet.push(tag);
            }
        }


        $scope.toggleLanguage = function(language) {
            toggleTag($scope.tagP.languages, language);
            //$scope.LanChecked = language;
            //$scope.LanChecked = 'myLanguage';
        };

        $scope.toggleCategory = function(category) {
            toggleTag($scope.tagP.categories, category);
            //$scope.CatChecked = 'myCategory';
        };

        $scope.toggleSubCategory = function(subCat) {
          toggleTag($scope.tagP.subCategory, subCat);
          //$scope.CatChecked = 'myCategory';
        };

        // Create and then delete cookie - cookies must be enabled to use analytics
        $scope.areCookiesEnabled = false;
        $cookieStore.put("TestCookie", "Test Cookie added!");
        $scope.cookieValue = $cookieStore.get("TestCookie");
        //console.log($scope.cookieValue);

        if ($scope.cookieValue) {
            $cookieStore.remove("TestCookie");
            $scope.areCookiesEnabled = true;
        }

        // Randomly display the samples and if href is empty then hide it
        $scope.randomP = function(){
            $(".hrefLink").each(function( index ) {
                if (!$(this).attr('href')){
                    $(this).hide();
                }
            });
            return 0.5 - Math.random();
        };

        // load data from the factory
        samplesFactory.getSamples().then(function(data) {
            $scope.samples = data.data;
        }).catch(function(error) {
            console.log(error);
        });





        ///////Handling the popup
        $rootScope.jsonData = '{"foo": "bar"}';
        $rootScope.theme = 'ngdialog-theme-default';
        $scope.open = function () {
            ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl' });
        };

        $scope.openDefault = function () {
            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-default'
            });
        };

        $scope.openPlain = function () {
            $rootScope.theme = 'ngdialog-theme-plain';

            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-plain'
            });
        };

        $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
                template: 'externalTemplate.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };

    });





//popup ctrl
angular
    .module('ngSamples')
    .controller('InsideCtrl', function ($scope, ngDialog) {
        $scope.openSecond = function () {
            ngDialog.open({
                template: '<h3><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
                plain: true,
                closeByEscape: false,
                controller: 'SecondModalCtrl'
            });
        };
    });

angular
    .module('ngSamples')
    .controller('SecondModalCtrl', function ($scope, ngDialog) {
        $scope.closeSecond = function () {
            ngDialog.close();
        };
    });
