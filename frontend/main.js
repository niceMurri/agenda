import 'core-js/stable'
import 'regenerator-runtime/runtime';
import './assets/css/style.css'

const b = 'oid'
console.log(b);



fetch('https://api.tibiadata.com/v3/character/klasjjx').then(e=> console.log(e)).catch(e => console.log(e))