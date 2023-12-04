import { check, group } from "k6"
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";



export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {

        http_req_duration: ['avg < 2000 '],
        http_req_failed: ['rate < 0.1'],
    },

}; 

export default function(){

    

       
//Test POST Create User
     group('POST CREATE USER', function () {
        
        const name = 'morpheus'
        const job = 'leader'
        const FULL_URL = 'https://reqres.in/api/users';
        const payload = JSON.stringify({
        
            name: name,
            job: job
        
        })
        
        const params = {
            headers: {
        
        'Content-Type': 'application/json',
        
        },
        };
        
     let res = http.post(FULL_URL, payload, params);

        check(res, {

            'is status 201': (res) => res.status == 201,
            
         });
            
         check(res, {
            
            'name same with request': (res) => {
                const response = JSON.parse(res.body); 
                return response.name === name
            
            },
            
         });
            
        check(res, {
            
            'job same with request': (res) => {
                const response = JSON.parse(res.body);
                return response.job === job
            
            },
         });
    });


//Test PUT Update User    

group('POST UPDATE USER', function () {
        
    const name = 'morpheus'
    const job = 'zion resident'
    const FULL_URL = 'https://reqres.in/api/users/2';
    const payload = JSON.stringify({
    
        name: name,
        job: job
    
    })
    
    const params = {
        headers: {
    
    'Content-Type': 'application/json',
    
    },
    };
    
 let res = http.post(FULL_URL, payload, params);

    check(res, {

        'is status 201': (res) => res.status == 201,
        
     });
        
     check(res, {
        
        'name same with request': (res) => {
            const response = JSON.parse(res.body); 
            return response.name === name
        
        },
        
     });
        
    check(res, {
        
        'job same with request': (res) => {
            const response = JSON.parse(res.body);
            return response.job === job
        
        },
     });
});


}

//Export Test result to HTML
export function handleSummary(data) {
    return {
      "performance_test-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }



