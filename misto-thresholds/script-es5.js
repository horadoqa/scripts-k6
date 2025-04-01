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

      cartola: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'cartola' }, 
        exec: 'cartola', 
      },

      globoplay: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'globoplay' }, 
        exec: 'globoplay', 
      },

      valor: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'valor' }, 
        exec: 'valor', 
      },

      oglobo: {
        executor: 'constant-vus',
        vus: 10,
        duration: '30s',
        gracefulStop: '0s', 
        tags: { test_type: 'oglobo' }, 
        exec: 'oglobo', 
      }
    },

    discardResponseBodies: true,
    thresholds: {
      'http_req_duration{test_type:g1}': ['avg<20'],
      'http_req_duration{test_type:ge}': ['avg<20'],
      'http_req_duration{test_type:globo}': ['avg<20'],
      'http_req_duration{test_type:gshow}': ['avg<20'],
      'http_req_duration{test_type:cartola}': ['avg<20'],
      'http_req_duration{test_type:globoplay}': ['avg<200'],
      'http_req_duration{test_type:valor}': ['avg<20'],
      'http_req_duration{test_type:oglobo}': ['avg<20'],
    },
  },

  globo: function () {
    var response = http.get('https://www.globo.com/healthcheck/');
    // console.log('Globo: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  g1: function () {
    var response = http.get('https://g1.globo.com/healthcheck/');
    // console.log('G1: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  ge: function () {
    var response = http.get('https://ge.globo.com/healthcheck/');
    // console.log('GE: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  gshow: function () {
    var response = http.get('https://gshow.globo.com/healthcheck/');
    // console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  cartola: function () {
    var response = http.get('https://gshow.globo.com/healthcheck/');
    // console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  globoplay: function () {
    var response = http.get('https://globoplay.globo.com/healthcheck/');
    // console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },

  valor: function () {
    var response = http.get('https://valor.globo.com/healthcheck/');
    // console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  },


  oglobo: function () {
    var response = http.get('https://oglobo.globo.com/healthcheck/');
    // console.log('Gshow: ', response.status);

    check(response, {
      'status é 200': function (r) { return r.status === 200; },
    });
  }

};
