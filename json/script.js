import { sleep } from 'k6';

// consider using SharedArray for large files
const users = JSON.parse(open('users.json')); 

export default function () {
  const user = users[__VU - 1];
  // console.log(`${user.username}, ${user.password}`);
  sleep(0.5);
}