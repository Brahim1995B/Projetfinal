import { react, useState, useEffect } from "react";
import "./style.css";
import backImage from "../../assets/images/back.jpg";
import carImage from "../../assets/images/car1.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate } from "react-router-dom";
import { addCar } from "../../Redux/Actions/PostActions";
import { current } from "../../Redux/Actions/AuthActions";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import cars from "./car-list.json";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Headers from "../../components/Header/Header";
import { CoPresent, DeleteOutline } from "@mui/icons-material";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function AddCar() {
  const [marqueSelectedIndex, setMarqueSelectedIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [marque, setMarque] = useState("");
  const [model, setModel] = useState("");
  const [puissanceF, setPuissanceF] = useState("");
  const [carburant, setCarburant] = useState("");
  const [annee, setAnnee] = useState(0);
  const [boite, setBoite] = useState("");
  const [kilometrage, setKilometrage] = useState(0);
  const [gouvernorat, setGouvernorat] = useState("Tunis");
  const [delegation, setDelegation] = useState("Tunis");
  const [prix, setPrix] = useState(0);
  const [phone, setPhone] = useState(0);
  const [image, setImage] = useState([]);
  const [carrosserie, setCarrosserie] = useState("");
  const [uploading, setUploading] = useState(false);
  const baseurl = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);
  const user = useSelector((state) => state.AuthReducer.user);
  if (!user){
    navigate('/signin')
  }
 
  
  const handleAdd = (a) => {
    a.preventDefault();
    dispatch(
      addCar(
        {
          title,
          description,
          category,
          marque,
          model,
          puissanceF,
          carburant,
          annee,
          kilometrage,
          prix,
          phone,
          image,
          carrosserie,
          owner: user._id,
          valid: false,
          created_at:new Date()
        },
        navigate
      )
    );
  };
  const handleChangeMarque = (value) => {
    const index = cars.findIndex((element) => element.brand === value);
    setMarqueSelectedIndex(index);
    setMarque(value);
  };

  const uploadProfileImage = (e) => {
    console.log(Object.values(e.target.files));
    const files = e.target.files;
    const bodyFormData = new FormData();
    Object.values(e.target.files).map((item, key) => {
      bodyFormData.append("files", item);
    });

    console.log(bodyFormData);
    setUploading(true);
    axios
      .post(baseurl + "/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  if (!user) {
    return <Navigate replace to="/signin  " />;
  } else {
  return (
    <>
      <Headers />
      <div className="container">
        <div
          className="row gutters "
          style={{ height: "100vh", backgroundImage: `url(${backImage})` }}
        >
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name">{user.name}</h5>
                    <h6 className="user-email">{user.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100" style={{ minWidth: "100%" }}>
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Ajouter une voiture</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="">
                      <text for="fullName">Marque</text>
                      <select
                        onChange={(e) => {
                          handleChangeMarque(e.target.value);
                        }}
                        class="form-control"
                      >
                        {cars.map((item, key) => (
                          <option value={item.brand}>{item.brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="eMail">Modeles</text>
                      <select
                        onChange={(e) => {
                          setModel(e.target.value);
                        }}
                        class="form-control"
                      >
                        {marqueSelectedIndex !== null &&
                          cars[marqueSelectedIndex].models.map((item, key) => (
                            <option value={item}>{item}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="phone">Puissance fiscal</text>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        onChange={(e) => setPuissanceF(e.target.value)}
                        value={puissanceF}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="website">Carburant </text>
                      <select
                        onChange={(e) => {
                          setCarburant(e.target.value);
                        }}
                        class="form-control"
                        value={carburant}
                      >
                        <option disabled selected value="">
                          {" "}
                          -- select an option --{" "}
                        </option>
                        <option value="Essence">Essence</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybride">Hybride</option>
                        <option value="Electrique">Electrique</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row gutters mt-3">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="Street">Année</text>
                      <input
                        type="number"
                        className="form-control"
                        id="Street"
                        onChange={(e) => setAnnee(e.target.value)}
                        value={annee}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="ciTy">kilometrage</text>
                      <input
                        type="number"
                        className="form-control"
                        id="ciTy"
                        onChange={(e) => setKilometrage(e.target.value)}
                        value={kilometrage}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="sTate">Description</text>
                      <textarea
                        className="form-control"
                        name="Text1"
                        cols="40"
                        rows="5"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <text for="zIp">Prix</text>
                      <input
                        type="number"
                        className="form-control"
                        id="zIp"
                        onChange={(e) => setPrix(e.target.value)}
                        value={prix}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mt-5">
                      <Button
                        component="label"
                        className="form-control"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          onChange={uploadProfileImage}
                          type="file"
                          multiple
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="row align-items-start">
                      {image&&image.map((item, key) => (
                        <div className="col-lg-3" style={{position:"relative"}}>
                          <IconButton onClick={()=>{
                       let carImage = [...image]
                       carImage.splice(key, 1);

                        console.log(carImage)
                        setImage(carImage)
                       }} style={{position:"absolute",right:0,top:0}}>
                         <DeleteOutline fontSize="small" style={{color:"red"}}/>
                       </IconButton>
                          <img src={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row gutters mt-3">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary "
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
                        onClick={handleAdd}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}}
