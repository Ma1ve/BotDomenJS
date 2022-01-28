const whois = require('whois-api');

const fs = require('fs')
const allDomains = require('./domains.json')


const arrayName = ['lego-gift', 'trello', 'eve'];
const arrayDomen = ['ru', 'com', '.org', '.info', 'net']; /* '.asia', '.biz', '.mobi', '.travel', '.xxx', '.tel', '.pro', '.name' */


const sleep = function(time) { return new Promise(function(resolve) { setTimeout(resolve, time); }); };


async function Search(Name, Domen){

  const validDomen = [];

  for (let name of Name) {
    for (let domen of Domen) {

      const fullName = name + "." + domen;

      await sleep(2000);

      whois.lookup(fullName, (error, result) => {
      
        if (error) {
          console.log(error)
        }

        

        if (result.creation_date) {
          
          if (!allDomains.includes(fullName)) {
            console.log(`Новый: ${fullName}`)
          }

          validDomen.push(fullName);

          fs.writeFile('domains.json', JSON.stringify(validDomen), (err) => {
            if (err) console.log(err)
          });
          console.log(validDomen)
          
        }
      });
    }
  }
}

Search(arrayName, arrayDomen)


function Info() {
  console.log(1)
}

Info()