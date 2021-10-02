import Utility from "/../Utilities/utility.js";
import Do from '/../Midlayer/midlayer.js';

const Title ='Portfolio Management';
const Description='Details of Stock holdings, available Balance, securities, and top recommendations'; 

Utility.SetElementValue('lblTitle',Title);
Utility.SetElementValue('lblTitleDescription',Description);

setInterval(()=>Do.DisplaySecurities(), 1000);
Do.DisplayRecommendations();
Do.setAvailableBalance();

const SecurityForm=Utility.GetElementById('frmsecurity');

Utility.AddEventListener('btnSubmitSecurity','click',(e)=>{
  e.preventDefault();                                                         
  let newSecurity=Utility.FetchFormValues(SecurityForm);
  
  Do.AddSecurity(newSecurity)
    .then(successMessage=>
    {
      console.log(successMessage);
      Utility.ResetFormValues(SecurityForm);
    })                                                                                                                    
    .catch(errorMessage=>alert(errorMessage));                                                           
});
Do.setTransactionUtility();
Do.setAvailableSecuritiesForBuyOrSell();