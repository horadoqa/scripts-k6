'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = undefined;
exports.globo = globo;
exports.g1 = g1;
exports.ge = ge;
exports.gshow = gshow;

var _http = require('k6/http');

var _http2 = _interopRequireDefault(_http);

var _k = require('k6');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = exports.options = {
  scenarios: {
    globo: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'globo' },
      exec: 'globo'
    },
    g1: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'g1' },
      exec: 'g1'
    },
    ge: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'ge' },
      exec: 'ge'
    },
    gshow: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      gracefulStop: '0s',
      tags: { test_type: 'gshow' },
      exec: 'gshow'
    }
  },
  discardResponseBodies: true,
  thresholds: {
    'http_req_duration{test_type:g1}': ['avg>2.500'],
    'http_req_duration{test_type:ge}': ['avg>3.000'],
    'http_req_duration{test_type:globo}': ['avg>6.000'],
    'http_req_duration{test_type:gshow}': ['avg>2.500']
  }
};

function globo() {
  var response = _http2.default.get('https://www.globo.com/');

  console.log('Globo: ', response.status);

  (0, _k.check)(response, {
    'status é 200': function status200(r) {
      return r.status === 200;
    }
  });
}

function g1() {
  var response = _http2.default.get('https://g1.globo.com/');

  console.log('G1: ', response.status);

  (0, _k.check)(response, {
    'status é 200': function status200(r) {
      return r.status === 200;
    }
  });
}

function ge() {
  var response = _http2.default.get('https://ge.globo.com/');

  console.log('GE: ', response.status);

  (0, _k.check)(response, {
    'status é 200': function status200(r) {
      return r.status === 200;
    }
  });
}

function gshow() {
  var response = _http2.default.get('https://gshow.globo.com/');

  console.log('Gshow: ', response.status);

  (0, _k.check)(response, {
    'status é 200': function status200(r) {
      return r.status === 200;
    }
  });
}