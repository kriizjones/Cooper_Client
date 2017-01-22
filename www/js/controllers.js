angular.module('starter.controllers', [])

  .controller('AppCtrl', function ( $rootScope,
                                    $scope,
                                    $ionicModal,
                                    $timeout,
                                    $auth,
                                    $ionicLoading) {

    // Create a current user
    $rootScope.$on('auth:login-success', function(ev, user) {
      $scope.currentUser = user;
    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $ionicLoading.show({
        template: 'Logging in...'
      });

      $auth.submitLogin($scope.loginData)
        .then(function (resp) {
          // handle success response
          $ionicLoading.hide();
          $scope.closeLogin();
        })
        .catch(function (error) {
          $ionicLoading.hide();
          // handle error response
          $scope.errorMessage = error;
        });

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('TestController', function($scope) {
    $scope.gender = ['Female', 'Male'];
    $scope.ageValues = {
      min: 20,
      max: 60,
      value: 20
    };
    $scope.distanceValues = {
      min: 1000,
      max: 3500,
      value: 1000
    };
    $scope.data = {};
    $scope.calculateCooper = function() {
      var person = new Person({
        gender: $scope.data.gender,
        age: $scope.data.age
      });

      person.assessCooper($scope.data.distance);
      $scope.person = person;
      console.log($scope.person)
    }
  })

.controller('PerformanceCtrl', function($scope, performaceData){
  $scope.saveData = function(){

  };
  $scope.retrieveData = function(){

  };
})

.controller('PerformanceCtrl', function($scope, performaceData, $ionicLoading, $ionicPopup){

  $scope.saveData = function(person){
    var data = {performance_data: {data: {message: person.cooperMessage}}};
    $ionicLoading.show({
      template: 'Saving...'
    });



    performaceData.save(data, function(response){
      $ionicLoading.hide();
      $scope.showAlert('Sucess', response.message);
    }, function(error){
      $ionicLoading.hide();
      $scope.showAlert('Failure', error.statusText);
    })
  }

  .controller('DataCtrl', function($scope, $stateParams){
    $scope.$on('$ionicView.enter', function () {
      $scope.savedDataCollection = $stateParams.savedDataCollection;
    });
  });

  $scope.retrieveData = function(){
    $ionicLoading.show({
      template: 'Retrieving data...'
    });
    performaceData.query({}, function(response){
      $state.go('app.data', {savedDataCollection: response.entries});
      $ionicLoading.hide();
    }, function(error){
      $ionicLoading.hide();
      $scope.showAlert('Failure', error.statusText);
    })
  };

  $scope.showAlert = function(message, content) {
    var alertPopup = $ionicPopup.alert({
      title: message,
      template: content
    });
    alertPopup.then(function(res) {
      // Place some action here if needed...
    });
  };
});



