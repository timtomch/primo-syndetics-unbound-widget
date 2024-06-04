/* Syndetics Unbound integration */

app.component('syndeticsWidgetComponent', {
  controller: 'syndeticsController'
}).factory('syndeticsService', [function () {
  function loadSyndeticsScript() {
    // This function is called whenever there's a need to inject Syndetics code.
    // If the Syndetics script appears to be absent, an element is created to reference it.
    if (typeof LibraryThingConnector == 'undefined') {
      // Create a script element for Syndetics
      var syndeticsScript = document.createElement('script');
      // Set the source attribute to the Syndetics Unbound URL with your specific parameters
      syndeticsScript.src = "https://unbound.syndetics.com/syndeticsunbound/connector/initiator.php?a_id=YOURID";
      // Append the script element to the document body
      document.head.appendChild(syndeticsScript);
    } else {
      // If the Syndetics script was already present, just reinitialize it.
      LibraryThingConnector.reinit();
    }
  }
  return {
    loadSyndeticsScript: loadSyndeticsScript
  };
}]).controller('syndeticsController', ['$scope', 'syndeticsService', function ($scope, syndeticsService) {
  this.$onInit = function () {
    // Check and load Syndetics script upon first page load.
    syndeticsService.loadSyndeticsScript();
  };
  $scope.$on('$locationChangeSuccess', function (event) {
    // Check and load Syndetics script whenever the page location changes.
    syndeticsService.loadSyndeticsScript();
  });
}]);

/* End Syndetics Unbound */