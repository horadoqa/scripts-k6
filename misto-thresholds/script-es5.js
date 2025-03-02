var http = require('k6/http');
var check = require('k6').check;

module.exports = {
  options: {
    scenarios: {
      globo: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'globo' }, 
        exec: 'globo', 
      },
      g1: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'g1' }, 
        exec: 'g1', 
      },
      ge: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'ge' }, 
        exec: 'ge', 
      },
      gshow: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'gshow' }, 
        exec: 'gshow', 
      },
    },
    discardResponseBodies: true,
    thresholds: {
      'http_req_duration{test_type:g1}': ['avg>2.500'],
      'http_req_duration{test_type:ge}': ['avg>3.000'],
      'http_req_duration{test_type:globo}': ['avg>6.000'],
      'http_req_duration{test_type:gshow}': ['avg>2.500'],
    },
  },

  globo: function () {
    var response = http.get('https://www.globo.com/');
    console.log('Globo: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });

  },

  g1: function () {
    var response = http.get('https://g1.globo.com/');
    console.log('G1: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });

  },

  ge: function () {
    var response = http.get('https://ge.globo.com/');
    console.log('GE: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });

  },

  gshow: function () {
    var response = http.get('https://gshow.globo.com/');
    console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });

  }
};
