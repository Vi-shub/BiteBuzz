import React,{useState} from "react";
import avatar from "../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Register = () => {

    const[image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const {data} = await axios.post("http://localhost:8000/api/v1/all/image-upload",formData);
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id
            });
        } catch (error) {
            console.error(error);
        }
    }
    console.log(image);

    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordConfirm = form.confirmPassword.value;
        const profileImage = image?.url;
        const userDtata = { name,email, password, passwordConfirm, profileImage };

        fetch("http://localhost:8000/api/v1/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDtata),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success){
                localStorage.setItem("token", data.data.token);
                toast.success(data.message);
                form.reset();
                navigate("/")
            }
            else{
                toast.error(data.message);
            }
        })
    }


  return (
    <div className="register">
      <div className="w-full mx-auto pt-[16vh]">
        <form onSubmit={handleOnSubmit} className="mb-10 ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5">
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              src={image?.url || avatar}
              alt=""
              className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
            />
          </label>
          <label className="block text-center text-gray-900 text-base mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            className="hidden"
            accept=".jpeg, .png, .jpg"
            onChange={handleImage}
          />
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4"> 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Password
            </label>
            <input
              type="password" placeholder="*********" name="password"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" >
            Confirm Password
            </label>
            <input
              type="password" placeholder="*********" name="confirmPassword"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          </div>
          <button type="submit" className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md  w-full rounded-full px-8 py-2 mt-3 mb-3 text-xl font-medium text-white mx-auto text-center">
              Register
            </button>
            <div className="flex flex-col items-center">

            <Link to="/login" className="text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded">
                Already have an account
            </Link>
            </div>
            <ToastContainer />
        </form>

      </div>
    </div>
  );
};

export default Register;
