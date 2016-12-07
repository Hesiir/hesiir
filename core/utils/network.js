import os from 'os';

let network = os.networkInterfaces();
export let IPList = [];
Object.keys(network).forEach(ifname => {
  let alias = 0;
  network[ifname].forEach(args => {
    if ('IPv4' !== args.family || args.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      IPList.push(`${ifname}${alias}:${args.address}`);
    } else {
      // this interface has only one ipv4 adress
      IPList.push(`${ifname}:${args.address}`);
    }
    ++alias;
  });
})