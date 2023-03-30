import axios from "axios";
const Urls="http://localhost:8000/api/v1"

export const APT_CALL = {
    vendorList,
    createReasorce,
    createVendor,
    resorceList,

  };


  function createReasorce(data){
    return axios.post(Urls + `/create_resource`,data)
    .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        if (error === "Unauthorized") {
         
          return [];
        }
        if (error.response !== undefined)
          if (error.response.status === 500) {
            if (error.response.status === 500) {
                alert("Reasorce is exist")
                return false
              }
          }
      });
  }

  function createVendor(data){
    return axios.post(Urls + `/create_vendor`,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response)
        if (error === "Unauthorized") {
          
          return [];
        }
        if (error.response !== undefined)
          if (error.response.status === 500) {
            alert("Vendor is exist")
            return false
          }
      });
  }
  
  function resorceList(){
    return axios.get(Urls + `/resource_list`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          
          return [];
        }
        if (error.response !== undefined)
          if (error.response.status === 401) {
            
            return [];
          }
      });
  }
  function vendorList(){
    return axios.get(Urls + `/vendors_list`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          
          return [];
        }
        if (error.response !== undefined)
          if (error.response.status === 401) {
            
            return [];
          }
      });
  }