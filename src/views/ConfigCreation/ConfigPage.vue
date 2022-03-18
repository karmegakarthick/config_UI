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
          <button id='button-21' v-on:click="getDetails()">Submit</button>
     </div>


 <div>
         <label>ClientName</label>
         <br/>
         <select id='dropdown' v-model="ClientName" name='Select Location'>
             <option value=""> ClientName </option>
             <option v-for="item in info"  :value='item.name' :key='item.deviceID' >{{item.name}} </option>
         </select>
     </div>
 <div>
         <label>LocationName</label>
         <br/>
         <select id='dropdown' v-model="ClientName" name='Select Location'>
             <option value=""> Select Location </option>
             <option v-for="item in info"  :value='item.name' :key='item.deviceID' >{{item.name}} </option>
         </select>
     </div>
      <div >
         <label>DeviceName</label>
         <br/>
         <select id='dropdown' v-model="devName">
             <option  v-for="item in infodetails"  :value='item.deviceName' :key='item.deviceID'  >{{item.deviceName}} </option>
         </select>
     </div>

     <div >
          <button id='button-21' v-on:click="Download()">Download Config File</button>
     </div>
     
</div>



  
</template>

<script>
import axios from 'axios'
export default {
    name:"ClientConfig",
data:function() {
    return {
      Client: '',
      ClientName:'',
      details:[],
      info:{},
      infodetails:{},
      IsVisible:true,
      OrgLocation:null,
      devName:'', 
      data:{}  
    }
}, 

created(){
          axios.get('http://localhost:6060/api/Home/getClientName').then((res)=>{
            console.log("response is :",res)
           this.info=res.data;
           console.log("clientName",this.info)

        }
        )

},

 methods : {
    getDetails:function(){
        axios.get('http://localhost:6060/api/Home/getGlobeDetails',{
            params:{
                client: this.ClientName,
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


      var all = new datamodel();
      var file = new File([ data  ], { "type" : "" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(file)
      link.download = 'active.config.js'
      link.click(all)
      console.log("answer",all)

    },

},

watch:{
    OrgLocation:function(){
        return this.infodetails=this.info.filter(x=> x.locationName== this.OrgLocation);

    },

    ClientName:function(){
      getDetails();
    }

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
#button-21 {
  align-items: center;
  appearance: none;
  background-color: #3EB2FD;
  background-image: linear-gradient(1deg, #4F58FD, #149BF3 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd,sans-serif;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color .2s,background-position .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}

.button-21:active,
.button-21:focus {
  outline: none;
}

.button-21:hover {
  background-position: -20px -20px;
}

.button-21:focus:not(:active) {
  box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
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



<style >


#button-24 {
  background-color: #ffffff;
  background-image: linear-gradient(1deg, #3EB2FD, #ffffff 99%);
  border: 1px solid #3EB2FD;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision; 
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

#button-24:hover,
#button-24:active {
  background-color: initial;
  background-position: 0 0;
  color: #3EB2FD;
}

#button-24:active {
  opacity: .5;
}

</style>