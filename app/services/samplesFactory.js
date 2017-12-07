angular
  .module('ngSamples')
  .factory('samplesFactory', function($http){


    function getSamples(){
      return $http.get('data/main.json');
    }


    return{
      getSamples: getSamples
    }

  });
