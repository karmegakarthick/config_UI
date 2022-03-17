<template>
  <div>
      <div> <h1>Config File Creation Page</h1></div>
      <div>
          <label>
             Organization Name 
          </label>
          </div>
          <div>
          <input type="text" id="text" v-model="client" placeholder="Organization Name"> <br/>
           <br/>
          <button id='button' v-on:click="getDetails()">Submit</button>
     </div>

 <div v-if="IsVisible">
         <label>LocationName</label>
         <br/>
         <select id='dropdown' v-model="OrgLocation" name='Select Location'>
             <option value=""> Select Location </option>
             <option v-for="item in info"  :value='item.locationName' :key='item.deviceID' >{{item.locationName}} </option>
         </select>
     </div>

      <div v-if="IsVisible"  >
         <label>DeviceName</label>
         <br/>
         <select id='dropdown' v-model="devName">
             <option  v-for="item in infodetails"  :value='item.deviceName' :key='item.deviceID'  >{{item.deviceName}} </option>
         </select>
     </div>

     <div v-if="IsVisible">
          <button id='button' v-on:click="Download()">Download Config File</button>
     </div>
</div>



  
</template>

<script>
import axios from 'axios'
import module from './conf'
export default {
    name:"ClientConfig",
data:function() {
    return {

      client:'',
      details:[],
      info:{},
      infodetails:{},
      IsVisible:true,
      OrgLocation:null,
      devName:'', 
      data:{}  
    }
}, 

 methods : {
    getDetails:function(){
        axios.get('http://localhost:6060/api/Home/getGlobeDetails',{
            params:{
                client: this.client,
            }
        }).then((res)=>{
            console.log("response is :",res)
           this.info=res.data;
           console.log("this information",this.info.locationId)

        }
        )
        if(this.info.length > 0){
            console.log("this information",this.info.locationId)
        IsVisible:true;
        }

    },
    Download:function(){
        this.details=this.infodetails.filter(x=> x.deviceName== this.devName);
        console.log("this is the sample",this.details);
        module.globeIdentification = this.details.globeIdentification;
        // var m = module.globeDeployment
        // m = this.details

          var data = {value : `module.exports = {
    globeIdentification: `+ this.details[0].deviceName +`,
    globeDeployment: `+this.details[0].clientName+" "+this.details[0].locationName+`,
    name: "GlobeChek_DESKTOP",
    version: "V3B",
    environment: "production",
    login: "api",
    ftpuser: "ftpuser",
    ftppsw: "GlobeChekPass1!",
    ftphost: "caecvm.eastus2.cloudapp.azure.com",
    urlPrereg:
      "https://globecheckportal-prod-api.azurewebsites.net/api/v1/Desktop/`+this.details[0].clientID+`~`+this.details[0].deviceID+`/",
    urlPortal: "https://gcdevstor.z20.web.core.windows.net/",
    urlAPI:
      "https://globecheckportal-prod-api.azurewebsites.net/api/v1/Desktop/`+this.details[0].clientID+`~`+this.details[0].deviceID+`/",
    urlCompanyWeb: "https://www.globechek.com/",
    va: false,
    maxHeight: "73",
  };`
}


      var file = new File([ JSON.stringify(data) ], { "type" : "" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(file)
      link.download = 'active.config.js'
      link.click()
      console.log("answer",this.details[0].clientName)

    },

},

watch:{
    OrgLocation:function(){
        return this.infodetails=this.info.filter(x=> x.locationName== this.OrgLocation);
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
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 5px;
}


</style>