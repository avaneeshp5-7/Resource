import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APT_CALL } from '../services/apiCall';

const CreateResorce = () => {

    const [full_name, setFullName] = React.useState("");
    const [resume, setResume] = React.useState('');
    const [vendor_name, setVendor] = React.useState("");
    const [technology, setTechnology] = React.useState([]);
    const [reqMsg, setreqMsg] = React.useState("")
    const [venderList, setVenderList] = React.useState([]);
    const [vendor, setVend] = React.useState("");
    const [venErr, setVenErr] = React.useState("")
    
    useEffect(() => {
        getVendor();
    }, []);

    // useEffect(() => {
        
    // }, [technology]);
    const getVendor = () => {
        APT_CALL.vendorList().then((res) => {
            if (res && res?.result) {
                setVenderList(res?.result);
            }
        });
    }

    const onChanges = (e) => {
        let name = e.target.name;
        if (name === "full_name") {
            setFullName(e.target.value)
        }
        if (name === "vendor_name") {
            setVendor(e.target.value)
        }
        if(name==="vendor"){
            setVend(e.target.value)
        }
       
        if(e.target.type==="checkbox"){
            let nm=e.target.value;
            let ar=[];
            if(e.target){
                var checkeds = document.querySelectorAll('input[type=checkbox');
               
                for (let a of checkeds) {
                    if(a.checked===true){
                        ar.push({val:a?.value,mk:a.checked})
                        setTechnology(ar)
                    }else{
                         if(a.value===nm){
                           setTechnology(ar.filter(fl=>fl.mk!==nm))
                         }
                    }
                }            
            }
        }
    }

    const onAddVendor=()=>{
        if(vendor===""){
            setVenErr("vendor name is required *")
            setTimeout(()=>{
                setVenErr("")
            },3000);
            return false
        }else{
            APT_CALL.createVendor({vendor:vendor}).then((res) => {
                if (res && res.status === 201) {
                    alert(res?.message);
                    getVendor();
                    setVend("")
                } 
            })
        }
    }

    const onSubmitForm = (e) => {
       
        let tq=technology?.map(vl=>{
            return vl.val
        });
        let finalTeq=tq?.toString();
        if (full_name === "" || resume === "" || vendor_name === "" || finalTeq === "") {
            setreqMsg("All fields are required *");
            setTimeout(() => {
                setreqMsg("")
            }, 3000);
            return false
        }       
        if (resume !== '') {
            if (resume.type === 'application/pdf') {

            } else {
                setreqMsg("Only pdf allowed.");
                setTimeout(() => {
                    setreqMsg("")
                }, 3000);
                return false
            }
        }
        const form = new FormData();
        form.append('full_name', full_name);
        form.append('resume', resume);
        form.append('vendor_name', vendor_name);
        form.append('technology', finalTeq);
        APT_CALL.createReasorce(form).then((res) => {
            if (res && res.status === 201) {
                alert(res?.message)
            } 
        })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-8 mx-auto p-4 m-5 border-light shadow-sm">
                    <div className='d-flex'>
                        <h3 className="">Create Resource </h3>
                        <button type="button" className="btn btn-primary add-ven" data-toggle="modal" data-target="#myModal">Add Vendor</button>
                        <Link className='mt-2 ml-3' to="/resorce">View Resource</Link>
                    </div>
                    <div className="form-style mt-3">
                        <form>
                            <div className="form-group pb-3">
                                <input type="text" onChange={onChanges} value={full_name} placeholder="Full name" name='full_name' className="form-control shadow-none" id="exampleInputEmail1" />
                            </div>
                            <div className="form-group pb-3">
                                <input type="file" placeholder="file"
                                    onChange={(e) => setResume(e.target.files[0])} className="form-control shadow-none" id="exampleInputPassword1" name='file' />
                            </div>
                            <div className="form-group pb-3" value={vendor_name}  >
                                <select className="form-control shadow-none" onChange={onChanges} name="vendor_name">
                                    <option value="">--Select Vendor--</option>
                                    {venderList?.map((val, id) => <option value={val?.vendor}>
                                        {val?.vendor}
                                    </option>)}
                                </select>
                            </div>
                            <div className="form-group pb-3">
                                <div class="form-group form-check float-left">
                                    <input type="checkbox" value="ReactJS" onChange={onChanges} class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">React Js</label>
                                </div>
                                <div class="form-group form-check float-left ml-4">
                                    <input type="checkbox" value="NodeJS" onChange={onChanges} class="form-check-input" id="exampleCheck2" />
                                    <label class="form-check-label" for="exampleCheck1">Node Js</label>
                                </div>
                                <div class="form-group form-check float-left ml-4">
                                    <input type="checkbox" value="MongoDB" onChange={onChanges} class="form-check-input" id="exampleCheck3" />
                                    <label class="form-check-label" for="exampleCheck1">Mongo DB</label>
                                </div>
                                <div class="form-group form-check float-left ml-4">
                                    <input type="checkbox" value="ExpressJS" onChange={onChanges} class="form-check-input" id="exampleCheck4" />
                                    <label class="form-check-label" for="exampleCheck1">Express JS</label>
                                </div>
                            </div>
                            <div className="pb-2">
                                <button type="button" onClick={onSubmitForm} className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                            </div>
                            <div className='bp-2'>
                                {reqMsg ? <span style={{ color: 'red', fontSize: 14 }}>{reqMsg}</span> : ''}
                            </div>
                        </form>

                    </div>

                </div>
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Create Vendor</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <input type="text" className='form-control' placeholder='vendor' onChange={onChanges} name="vendor" value={vendor}/>
                        </div>

                        <div class="modal-footer">
                            <button className='btn btn-dark' onClick={onAddVendor}>Submit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        {venErr?<span style={{color:'red',fontSize:14}}>{venErr}</span>:''}
                    </div>
                </div>
            </div>

        </div>



    );

}

export default CreateResorce;