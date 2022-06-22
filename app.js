var app = angular.module("myApp", ["ngRoute"]);
let productDataLink = null;
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "food-list.html",
      controller: "apiCall",
    })
    .when("/detail", {
      templateUrl: "food-detail.html",
      controller: "apiCall",
    })
    .otherwise({
      redirectTo: "/",
    });
});

app.controller("apiCall", function ($scope, $http) {
  $scope.getRequest = function (dish) {
    if (!dish) {
      return;
    }
    $http
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${dish}&app_id=e0196dd4&app_key=7962f8dbe5b23ccb092a528bcc3a57bf`
      )
      .then(
        function successCallback(response) {
          $scope.response = response["data"]["hits"];
          console.log(response);
        },
        function errorCallback(response) {
          console.log("Unable to perform get request");
        }
      );
  };

  $scope.handleClick = function (props) {
    productDataLink = props;
  };

  $scope.getProductData = function () {
    if (!productDataLink) {
      return;
    }

    $http.get(productDataLink).then(
      function successCallback(response) {
        $scope.productData = response.data;
        console.log(response.data);
      },
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );
  };
});
