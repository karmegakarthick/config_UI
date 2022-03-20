<template>
  <div>
      <div> <h1>Configuration File</h1></div>
      <div>
         <label>OrganizationName</label>
         <br/>
         <select id='dropdown' v-model="clientname" name='Select Organization'>
             <option v-for="item in info"  :value='item.name' :key='item' >{{item.name}} </option>
         </select>
     </div>
     <div>
         <label>LocationName</label>
         <br/>
         <select id='dropdown' v-model="OrgLocation" name='Select Location'>
             <option v-for="items in infodetails"  :value='items.locationName' :key='items.deviceID' >{{items.locationName}} </option>
         </select>
     </div>
      <div>
         <label>DeviceName</label>
         <br/>
         <select id='dropdown' v-model="devName">
             <option  v-for="dataitem in details"  :value='dataitem.deviceName' :key='dataitem.deviceID'  >{{dataitem.deviceName}} </option>
         </select>
     </div>
     <div>
          <button id='button-18' v-on:click="Download()">Download</button> &nbsp;  <button id='button-1'>Cancel</button>
     </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
    name:"ClientConfig",
data:function() {
    return {
      clientname:'',
      details:[],
      info:[],
      infodetails:[],
      IsVisible:true,
      OrgLocation:null,
      devName:'', 
      data:{}  
    }
}, 
created(){
   axios.get('http://localhost:6060/api/Home/getClientName')
          .then((res)=>{
           this.info=res.data;
           console.log(this.info)
        }
        )
},
 methods : {
    Download:function(){
        this.details=this.infodetails.filter(x=> x.deviceName== this.devName);
        console.log("this is the sample",this.details);
        // var m = module.globeDeployment
        // m = this.details
var data = `module.exports = {
    globeIdentification:"`+this.details[0].deviceName+`",
    globeDeployment: "`+this.details[0].clientName+" "+this.details[0].locationName+`",
    name: "GlobeChek_DESKTOP",
    version: "6.0.13",
    environment: "dev",
    login: "api",
    ftpuser: "ftpuser",
    ftppsw: "GlobeChekPass1!",
    ftphost: "caecvm.eastus2.cloudapp.azure.com",
    urlPrereg:
      "https://globecheckportal-globecheckapi.azurewebsites.net/api/v1/Desktop/api/v1/Desktop/`+this.details[0].clientID+"~"+this.details[0].deviceID +`/",
    urlPortal: "https://gcdevstor.z20.web.core.windows.net/",
    urlAPI:
      "https://globecheckportal-globecheckapi.azurewebsites.net/api/v1/Desktop/`+this.details[0].clientID+ "~"+this.details[0].deviceID + `/",
    urlCompanyWeb: "https://www.globechek.com/",
    va: false,
    maxHeight: "73",
  };`
      // var all = new datamodel();
      // all.globeIdentification = this.details[0].deviceName;
      // all.globeDeployment = this.details[0].clientName+" "+this.details[0].locationName;
      // all.urlPrereg = "https://globecheckportal-prod-api.azurewebsites.net/api/v1/Desktop/"+this.details[0].clientID+'~'+this.details[0].deviceID+"/";
      // all.urlAPI = "https://globecheckportal-prod-api.azurewebsites.net/api/v1/Desktop/"+this.details[0].clientID+`~`+this.details[0].deviceID+"/";
      var file = new File([ data  ], { "type" : "" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(file)
      link.download = 'active.config.js'
      link.click()
      // console.log("answer",all)
    },


    
},
watch:{
   clientname(){
        axios.get('http://localhost:6060/api/Home/getGlobeDetails',{
            params:{
                ClientName: this.clientname,
            }
        }).then((res)=>{
            console.log("response is :",res)
           this.infodetails=res.data;
           console.log("this information",this.infodetails)})
           },
    OrgLocation(){
        return this.details=this.infodetails;
    },
},  
}
</script>
<style>
#button {
  background-color: #4c7aaf; /* Green */
  border: none;
  color: white;
  padding: 12px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}



#button-18 {
  align-items: center;
  background-color: #0A66C2;
  
  border-color: #0A66C2;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}

#button-18:hover,
#button-18:focus { 
  background-color: #ffffff;
  color: #0A66C2;
}

#button-18:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
}

#button-18:disabled { 
  cursor: not-allowed;
  background: rgb(255, 255, 255);
  color: rgba(255, 254, 254, 0.994);
}




#button-1 {
  align-items: center;
  background-color: #ffffff;
  
  border-color: #444444;
  border-radius: 100px;
  box-sizing: border-box;
  color: #444444;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}

#button-1:hover,
#button-1:focus { 
  background-color: #d4d1d1;
  color: #1d1d1d;
}

#button-1:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
}

#button-1:disabled { 
  cursor: not-allowed;
  background: rgb(255, 255, 255);
  color: rgba(255, 254, 254, 0.994);
}



#text {
    width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
div {
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
