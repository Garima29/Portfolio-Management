// eslint-disable-next-line no-unused-vars
import Security from "../Entities/Security.js";
let Securities=[{
  Name : 'Microsoft',
  Price : 173.25,
  Quantity : 35,
  Sector : 'Technology',
  FNOAvailable : 'Yes'
},{
  Name : 'Amazon.com Inc.',
  Price : 1436.22,
  Quantity : 50,
  Sector : 'E-Commerce',
  FNOAvailable : 'Yes'
},{
  Name : 'Netflix Inc.',
  Price : 298.07,
  Quantity : 100,
  Sector : 'Media',
  FNOAvailable : 'Yes'
},{
  Name : 'Time Warner Inc',
  Price : 96.71,
  Quantity : 100,
  Sector : 'Media',
  FNOAvailable : 'NA'
}
];

let AvailableFund = 26000;


let ClassifiedSecurities=[];
for(const currSecurity of Securities){
ClassifiedSecurities.push(new Security(currSecurity));
}



let RecomendedSecurities=[{
  ID:0,
  Name : 'Cipla',
  Rating: 'AAA',
  Sector : 'Pharmaceutics',
  FNOAvailable : 'NA',
  [Symbol('PremiumContent')] : 'Cipla Uint 6 USFDA clearance is due and stock is expected to rise by 13%'
},{
  ID:1,
  Name : 'Lupin',
  Rating: 'AA+',
  Sector : 'Pharmaceutics',
  FNOAvailable : 'Yes',
  [Symbol('PremiumContent')] : 'Lupin to launch new APIs in EU and stock is expected to rise by 8%'
},{
  ID:2,
  Name : 'SoftBank',
  Rating: 'AAA',
  Sector : 'Banking',
  FNOAvailable : 'Yes',
  [Symbol('PremiumContent')] : 'SoftBank joins hands with Amazon for IOT and stock is expected to rise by 20% '
},{
  ID:3,
  Name : 'Atlantis NA',
  Rating: 'AAA+',
  Sector : 'Miscellanous',
  FNOAvailable : 'NA',
  [Symbol('PremiumContent')] : 'Stock to soar by 5-6% on account of strategic aliance with Nokia'
},
{
  ID:4,
  Name : 'BMC Inc',
  Rating: 'AA',
  Sector : 'IT',
  FNOAvailable : 'Yes',
  [Symbol('PremiumContent')] : 'Stock to rise by 15-16% on 3 strong domestic acquisitions in latin America'
},{
  ID:5,
  Name : 'Cilantro Foods',
  Rating: 'A+',
  Sector : 'Food Manufacturing',
  FNOAvailable : 'NA',
  [Symbol('PremiumContent')] : 'Cilantro starts online delivery. Sales up by 15%. Stock may see an upside of 6-7%'
}
];

export {ClassifiedSecurities,RecomendedSecurities ,AvailableFund};

