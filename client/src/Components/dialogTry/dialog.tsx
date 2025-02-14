import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { storeType } from '../../Redux/reducers/rootReducer'
import { Category } from '../../types/category'
// import './DialogDemo.css';

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
////
const User = useSelector((store:storeType)=>store.UserReducer);

const _navigate=useNavigate();
    
    const myCheckValidate=(values:any)=>{
        const errors:any={};
        if(values.categoryName=='' || !values.categoryName)
        errors.categoryName="Required"
        
        return errors;
        }

    const mySubmit= (values:any)=>{
        // submit פונקציה שתופעל בלחיצה על //

        //save in BD
        const categoryToAdd :Category={
            categoryName:myFormik.values.categoryName,
            userId:User.userId

        }

        axios.post("https://localhost:44323/api/Categories/AddCategory", categoryToAdd).then(
          function (response) {
              console.log(response);
             
          }
      ).catch(
          function (error) {
              console.log(error)
          }

      );
    
        alert("add category:" +myFormik.values.categoryName)

        closeModal() 
        //   ????? where we go now
        // _navigate("header/category")
        //לרענן את הדף ... 
       }

    const myFormik=useFormik(
        {
        initialValues:{categoryName:''},
        validate: myCheckValidate,
        onSubmit: mySubmit,
        }
        )
        /////
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          add category
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    add category
                  </Dialog.Title>
                  <div className="mt-2">
                    
                    <form onSubmit={myFormik.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="categoryName">category name</label>
                    <input className="form-control"
                        id="categoryName"
                        name="categoryName"
                        type="categoryName"
                        onChange={myFormik.handleChange}
                        // value={myFormik.values.categoryName} 
                        />
                </div>
                {myFormik.errors.categoryName ? <div className="alert alert-danger">{myFormik.errors.categoryName}</div>:''}

                
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add category</button>
                </div>
   
           </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
