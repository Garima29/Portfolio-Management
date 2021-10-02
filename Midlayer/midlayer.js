import {ClassifiedSecurities as SecurityData, RecomendedSecurities } from '../Data/MockData.js';
import Utility from '../Utilities/utility.js';
import Security from '../Entities/Security.js';

const PassRecommendationToForm=(Data, Event)=>{
    const formControlName=Utility.GetElementById('Name');
    const formControlSector=Utility.GetElementById('Sector');
    formControlName.value=Data.Name;
    formControlSector.value=Data.Sector;
  };
  
  const ShowRecommendedSecurityDetails=(recommendedScrip)=>{
    let premiumContent=Reflect.ownKeys(recommendedScrip).filter(i=>typeof i=='symbol')[0];
    let recommendationDetailsHtml=`<div class="card">
             <div class="card-header">
                 News about
             </div>
             <div class="card-body">
                 <h5 class="card-title">${recommendedScrip.Name}</h5>
                 <p class="card-text">${recommendedScrip[premiumContent]}</p>
                 <a class="btn btn-success" id="btnAddReco">Select Security</a>                                        
             </div>
             </div>`;
  
    let detailsControl= Utility.GetElementById('divSecurityDetails'); 
    detailsControl.innerHTML= recommendationDetailsHtml;  
    Utility.AddEventListener('btnAddReco','click',PassRecommendationToForm.bind(this, recommendedScrip));
  };

  const setAvailableBalance=(quote=0,amount=26000)=>{
    const balance=Utility.GetElementById('balanceDisplay');
    if(quote==0){
      balance.innerText=amount;       
    }else{
      let previousBalance=Number(balance.innerText);
      let UpcomingBalance=previousBalance-quote;
      if(UpcomingBalance>0){
        balance.innerText=Utility.RoundOff(UpcomingBalance,2);
        return true;
      }else{
        return false;
      }
    } 
  };  

const GetTop=([first,,,,...remaining])=>{
    return [first,...remaining];
  };
class Do{
    static setAvailableBalance(){
       setAvailableBalance();
    }
    

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
    static DisplayRecommendations(){
        let RecommendedSecuritiesListControl= Utility.GetElementById('ulrecommendations');
        console.log(RecomendedSecurities);
        let lisRecommendations=GetTop(RecomendedSecurities).map(i=>`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${i.Name}
                    <span class="badge badge-primary badge-pill badgereco" id="${i.ID}">view</span>
                </li>
        `).join('');
        RecommendedSecuritiesListControl.innerHTML=lisRecommendations;
        let allSpans=Utility.GetElementByClassName('badgereco');
        [...allSpans].forEach(i=>{
        Utility.AddEventListener(i.id,'click',ShowRecommendedSecurityDetails.bind(this,RecomendedSecurities[i.id]));
        });
    }
}  



export default Do;