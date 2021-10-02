import {ClassifiedSecurities as SecurityData, RecomendedSecurities } from '../Data/MockData.js';
import Utility from '../Utilities/utility.js';
import Security from '../Entities/Security.js';

class Do{
    static DisplaySecurities()
    {
        let SecuritiesTableControl= Utility.GetElementById('tblSecurities');
        let thead=`
                       <thead class="thead-dark">
                                 <tr>`+
                                        Object.keys(SecurityData[0])
                                          .map(i=>`<th scope="col">${i}</th>`)
                                          .join('') +                         
                                ` </tr>
                       </thead>               
                       `;
      let tbody=`
                       <tbody>`+
                      SecurityData.map(i=>`
                                               <tr>                                                                  
                                                   <td>${i.Name} (${i.showLivePrice()})</td>
                                                   <td>${i.Price}</td>
                                                   <td>${i.Quantity}</td>                                                                                                                <td>${i.Sector}</td>
                                                   <td>${i.FNOAvailable}</td>                                          
                                                   </tr>
                                            `)
                        .join('') +                                               
                                           '</tbody>';                      
      SecuritiesTableControl.innerHTML=thead+tbody;
    }
}  

export default Do;