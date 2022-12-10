/* eslint-disable */
import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdLocalDrink , MdCloudUpload , MdDelete , MdFoodBank , MdPriceChange } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg('Ups Something Error : You Can Try Upload Image Again 😇')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(donwloadUrl =>{
        setImageAsset(donwloadUrl);
        setIsLoading(false)
        setFields(true);
        setMsg('Your upload is successfully 🤟');
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
    })
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(( ) => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true);
        setMsg('Deleted is successfully 🤟');
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false);
        }, 4000);
    })
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (( !title || !calories || !imageAsset || !price || !category)) {

        setFields(true);
        setMsg('Ups Something Error : You Have to Fill All Field 😇')
        setAlertStatus('danger')
        setTimeout(() => {
        setFields(false);
        setIsLoading(false);
        }, 4000);
      }else{
        const data = {
          id : `${Date.now()}`,
          title : title,
          imageUrl : imageAsset,
          category : category,
          calories : calories,
          qty : 1,
          price : price
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true);
        setMsg('Data uploaded is successfully 🤟');
        clearData();
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }      
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Ups Something Error while uploading : You Can Try Again 😇')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select category")
  }

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className='flex items-center justify-center w-full h-auto min-h-screen'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 gap-4 flex flex-col items-center justify-center'>
        {
          fields && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
            }`}>
              {msg}
            </motion.p>
          )
        }
        <div className='flex items-center w-full gap-2 py-2 border-b border-gray-300'>
          <MdLocalDrink className='text-xl text-gray-700' />
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give name for this..." className='w-full h-full text-lg font-semibold bg-transparent border-none outline-none placeholder:text-gray-400 text-textColor' />
        </div>
        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full p-2 text-base border-b-2 border-gray-200 rounded-md outline-none cursor-pointer">
            <option value="other" className='bg-white'>Select Category</option>
            {categories && categories.map(item =>(
              <option key={item.id} className="text-base capitalize bg-white border-0 outline-none text-headingColor" value={item.urlParamName}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dotted rounded-lg cursor-pointer group h-225 md:h-420'>
          {isLoading ? ( <Loader /> ): ( 
          <>
              {!imageAsset ? (
              <>
                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                  <div className='flex flex-col items-center justify-center w-full h-full gap-2'>
                    <MdCloudUpload className='text-3xl text-gray-500 hover:text-gray-800' />
                    <p className='text-gray-500 hover:text-gray-800'>Click me to upload image</p>
                  </div>
                  <input type="file" name='uploadimage' accept='image/*' onChange={uploadImage}  className="w-0 h-0" />
                </label>
              </> 
              ) : ( 
              <>
                <div className='relative h-full'>
                  <img src={imageAsset} alt="uploaded image" className='object-cover w-full h-full'/>
                  <button type='button' className='absolute p-3 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer bottom-3 right-3 hover:shadow-md' onClick={deleteImage}>
                    <MdDelete className='text-white' /> 
                  </button>
                </div>
              </>
              )}
          </>
          )}
        </div>
        <div className='flex flex-col items-center w-full gap-3 md:flex-row'>
          <div className='flex items-center w-full gap-2 py-2 border-b border-gray-300'>
            <MdFoodBank  className='text-2xl text-gray-700'/>
            <input value={calories} onChange={(e) => setCalories(e.target.value)} type="text" required placeholder='Alcohol' className='w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-400 text-textColor' />
          </div>
          <div className='flex items-center w-full gap-2 py-2 border-b border-gray-300'>
            <MdPriceChange  className='text-2xl text-gray-700'/>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" required placeholder='Price' className='w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-400 text-textColor' />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <button type="button" className='w-full px-12 py-2 ml-0 text-lg font-semibold text-white border-none rounded-lg outline-none bg-emerald-500' onClick={saveDetails}>
           save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer