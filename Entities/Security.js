import Utility from "../Utilities/utility.js";
class Security{

  constructor({Name,Price,Quantity,Sector,FNOAvailable}){            
    this.Name=Name;
    this.Price=Price;
    this.Quantity=Quantity;
    this.Sector=Sector;
    this.FNOAvailable=FNOAvailable;
  }
  
  showLivePrice(){
    let randomLogic=Math.ceil(Math.random()*100,1)%2;
    let livePrice=0;
    if(randomLogic){
      livePrice=Utility.RoundOff(Number(this.Price)+Math.random(),2);
    }else{
      livePrice=Utility.RoundOff(Number(this.Price)-Math.random(),2);
    }
    return this.Price > livePrice ? livePrice+"▼" : livePrice+"▲";
  }         
}
export default Security;