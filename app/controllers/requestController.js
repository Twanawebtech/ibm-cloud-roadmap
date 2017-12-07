angular
    .module('ngSamples')
    .controller('requestController', function ($scope, $http, $log) {

        var API_URL = 'https://b4651037-d05a-4b7d-ab46-1e9a1abc096f-gws.api-gw.mybluemix.net/mailAction/api'; // OpenWhisk Action exposed as a API
        $scope.emailSent = false; // setting message logic to false not display any message by default

        $scope.sendMail = function () { //The send button will call this method to make an API to a OpenWhisk Action exposed as a API

            //scope binding the form data
            var data = {
                myName: $scope.myName,
                myEmail: $scope.myEmail,
                myUrl: $scope.myUrl,
                myDescription: $scope.myDescription
            };
            // adding content type for post header, this is needed for when calling OpenWhisk API
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            // Simple POST request example (passing data) :
            $http.post(API_URL, data, config)
                .then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $log.log('Email Sent with response status of: ' + JSON.stringify(response.status));
                    $scope.emailSent = true;

                    // Injecting success into the array of alerts
                    $scope.alerts = [ {type: 'success', msg: ''} ];
                    $scope.alerts[0].msg = 'Thanks, ' + $scope.myName + ' we have got your request, and we will be in touch. ';

                    // After user sent the email, then clear the values to be empty
                    $scope.myName = "";
                    $scope.myEmail = "";
                    $scope.myUrl = "";
                    $scope.myDescription = "";
                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.log("Error occurred with status: " + '' + JSON.stringify(response.status));
                    $scope.emailSent = true;

                    // if there was an error, then display this message
                    $scope.alerts = [
                        {type: 'danger', msg: ''}
                    ];
                    $scope.alerts[0].msg = 'Oops there was a problem sending your request, please contact Twana Daniel at twanaazi@ie.ibm.com';
                });

        };

        // Remove alert message area
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    });
