let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Url Shortening API', () => {
  /**
   *  Test Script for the POST: encode route
   */
  // let short;

  describe("POST /api/v1/encode", () => {
    it("It should shorten a URL.", (done) => {
      var short;
      const payload = {
        fullUrl: "www.google.com"
      }
      chai.request(server)
          .post('/api/v1/encode')
          .send(payload)
          .end((err, response) => {
            short = response.body.data.shortUrl;
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            // response.body.data.should.have.property('shortUrl')
          done();
          });

          console.log("SHORT: => ", short)
          // it("It should decode a short Url, and return an object containing the complete Url.", (done) => {
          //       const payload = {
          //         shortUrl: short
          //       }
          //       console.log(payload);
          //       chai.request(server)
          //           .get('/api/v1/decode')
          //           .send(paylaod)
          //           .end((err, response) => {
          //             response.should.have.status(200);
          //             response.body.should.be.a('object');
          //             response.body.should.have.property('data');
          //             response.body.data.should.have.property('fullUrl');
          //           done();
          //           }) 
          //      })
    });
  });

  // /**
  //  *  Test script for the GET: decode route
  //  */
  //  describe("GET /api/v1/decode", () => {
  //    it("It should decode a short Url, and return an object containing the complete Url.", (done) => {
  //     const payload = {
  //       shortUrl: short
  //     }
  //     console.log(payload);
  //     chai.request(server)
  //         .get('/api/v1/decode')
  //         .send(paylaod)
  //         .end((err, response) => {
  //           response.should.have.status(200);
  //           response.body.should.be.a('object');
  //           response.body.should.have.property('data');
  //           response.body.data.should.have.property('fullUrl');
  //         done();
  //         }) 
  //    })
  //  });

  //  /**
  //  *  Test script for the GET: statistic route
  //  */
  // describe("GET /api/v1/statistic/:code", () => {
  //   it("It should return the statistics of the shortened url.", (done) => {
  //     chai.request(server)
  //         .get('/api/v1/statistic/' + short)
  //         .end((err, response) => {
  //           response.should.have.status(200);
  //           response.body.should.be.a('object');
  //           response.body.should.have.property('data');
  //           response.body.data.should.have.property('fullUrl');
  //           response.body.data.should.have.property('clicks');
  //         })
  //   })
  // })


});