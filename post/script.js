import http from 'k6/http';
import {sleep, check} from 'k6';

export let options = {
    stages:[
        {duration: '10s', target:10},
        {duration: '10s', target:10},
        {duration: '10s', target:0},
    ]
};

export default function(){

    let url = "";
    let payload = JSON.stringify(
        {
            
         }
    );

    let headers = {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    let resp = http.post(url,payload,headers);

    check(resp,{'result: 200': (r) => r.status == 200});
    sleep(1);
}