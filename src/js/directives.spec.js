describe('unit testing Server Node Name', function() {
  var $compile,
      $rootScope;

  beforeEach(module('motech-widgets'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach($inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces telement with server nodename', function() {
    var element = $compile("<server-node-name></server-node-name>")($rootScope);
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("somethign");
  });
});