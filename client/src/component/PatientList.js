import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authContext/authState';
import { GlobalContext } from '../patientContext/GlobalState';
import { DeleteModal } from './DeleteModal';
import { FormModal } from './FormModal';

export const PatientList = () => {
    const [currentId, setCurrentId] = useState(0);
    const [display, setDisplay] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add,setAdd]=useState(false);
    const { getPatients, patients } = useContext(GlobalContext);
    const {loadUser,isAuthenticated} =useContext(AuthContext);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {loadUser();getPatients(); }, []);


    const Edit = (id) => {
        setEdit(prev => !prev);
        setCurrentId(id)
    }

    const openModal = (id) => {
        setDisplay(prev => !prev);
        setCurrentId(id)
    }

   const Add =()=>{
       setAdd(prev=>!prev);
       
   }
   


    return (
       <> {isAuthenticated?
        <div className="text-gray-50 bg-gray-500  rounded mt-5 object-scale-down w-2/3 mx-auto ">

            <div className="p-4 flex justify-between">
                <div>        
            <h1 className=" text-center text-2xl font-bold text-gray-50">Patients List</h1>
                   
                </div>
                <div>
                    <button onClick={()=>Add()}className="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-1 px-2 rounded">
                        +Add
</button>
               {add?
                <FormModal add={add}  setCurrentId={setCurrentId} setAdd={setAdd}/>:null}
                </div>

            </div>

            <div className="px-3 py-4 flex justify-center mx-auto">
                <table className="w-full text-md text-black bg-gray-50 shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left  font-extrabold p-3 px-5">Name</th>
                            <th></th>
                        </tr  >
                        {patients.map(patient => {
                            return (
                                <tr className="border-b " key={patient.patient_id}>
                                    <td className="p-3 px-5 text-sm font-bold tracking-wide ">FirstName:{patient.first_name}<br />LastName:{patient.last_name}<br />Email:{patient.email}<br />Phone:{patient.phone}</td>
                                    <td className="p-3 px-5 flex justify-end">
                                        <button onClick={()=> Edit(patient.patient_id)} type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold">Edit</button>
                                        {edit?
                                        <FormModal currentId={currentId} setCurrentId={setCurrentId} edit={edit} setEdit={setEdit} />:null}
                                        <button onClick={()=> openModal(patient.patient_id)} type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline font-bold"> Delete</button>
                                        {display?
                                        <DeleteModal currentId={currentId} setCurrentId={setCurrentId} display={display} setDisplay={setDisplay}/>:null}


                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>:null}
        </>



    )
}


