/*
 * SUT: 
 */

var properties = require('node-properties')('node-web', 'test');
    properties = require('node-properties')('sequelize');

var controller = require('../../routes/mainController.js');
var service = require('../../services/mainService.js');


describe('Template', function() {

  describe('The first behaviour to test', function() {

    var stringTest;
    beforeEach(function() {
      stringTest = ' Hola mundo ';
    });

    var expectedTest;
    it('The first test function', function() {
      expectedTest = ' H';
      
      var trimedString = stringTest.substring(0, 2);

      expect(trimedString).toBe(expectedTest);
    });

  });

});