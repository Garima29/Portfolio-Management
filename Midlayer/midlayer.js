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

  const ValidateSecurity=(securityToBeAdded)=>{
    let IsValid=false;
    let ValidationMessage='Valid';
    let Name=securityToBeAdded.Name;
    let Price=securityToBeAdded.Price;
    let Quantity=securityToBeAdded.Quantity;
  
    if(Name=='NA' || Price=='NA'||Quantity=='NA'){
  
      ValidationMessage='Name,Price or Quantity cannot be empty';
      return {IsValid,ValidationMessage};
    }else if(SecurityData.filter(i=>i.Name==securityToBeAdded.Name).length>0){/* 6. Find the appropriate array method to replace map to make this work*/
  
      ValidationMessage='Security already exists';
      return {IsValid,ValidationMessage};
    }
    else if(!setAvailableBalance(Number(securityToBeAdded.Quantity)*Number(securityToBeAdded.Price))){
  
      ValidationMessage='You are running low on balance';
      return {IsValid,ValidationMessage};
    }else{
      IsValid=true;
      return {IsValid,ValidationMessage};
    }
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
    static AddSecurity(securityToBeAdded){
        return new Promise((resolve,reject)=>{
    
          setTimeout(()=>{
    
            const ValidationData=ValidateSecurity(securityToBeAdded);
            if(ValidationData.IsValid)
            {
              console.log('Adding your security...');
              SecurityData.push(new Security(securityToBeAdded));
    
              this.DisplaySecurities();
    
              this.setAvailableSecuritiesForBuyOrSell();
              resolve('Security added sucessfully');    
            }else{
              reject(ValidationData.ValidationMessage);
            }  
    
          },3000);
        });     
      }

      static setAvailableSecuritiesForBuyOrSell(){
        const secDpDn=Utility.GetElementById('AvailableSecurities');
        if(secDpDn){
          const secDpdnHtml= [...SecurityData].map((sec,index)=>`<option value="${index}">${sec.Name}</option>`);
          secDpDn.innerHTML=secDpdnHtml;
        }
    
      }

      static buyOrSellSecurity(txType){
        const secIndex= Number(Utility.GetElementById('AvailableSecurities').value);
        let availableQty=Number(SecurityData[secIndex].Quantity);
        let qtyToBuyOrSell=Number(Utility.GetElementById('txQuantity').value);
        let livePrice=Number(SecurityData[secIndex].showLivePrice().slice(0,-1));
        let newQty=0;
        let margin=qtyToBuyOrSell*livePrice;
        let balanceOk=false;
    
        if(txType=='sell'){
          if(qtyToBuyOrSell<=availableQty){
            newQty=availableQty-qtyToBuyOrSell;
            balanceOk=setAvailableBalance(-margin);
          }
        }else{
    
          newQty=availableQty+qtyToBuyOrSell;
          balanceOk=setAvailableBalance(margin);
        }
        if(balanceOk){
          SecurityData[secIndex].Quantity=newQty;
          this.DisplaySecurities();
        }else{
          alert('Illegal transaction');
        }
    
      }
      static setTransactionUtility(){
        Utility.ToggleVisibility('jmbTransact'); 
        Utility.AddEventListener('txSec','click',(e)=>{
          Utility.ToggleVisibility('jmbTransact');                                           
          e.preventDefault();
        });
    
    
        Utility.AddEventListener('txBuy','click',(e)=>{this.buyOrSellSecurity('buy'),e.preventDefault();});
        Utility.AddEventListener('txSell','click',(e)=>{this.buyOrSellSecurity('sell'),e.preventDefault();});
      }
}  



export default Do;