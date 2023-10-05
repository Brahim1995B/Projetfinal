import react, { useEffect, useState } from "react";
import Headers from "../../components/Header/Header";
import CardCar from "../../components/CardCar/CardCar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getOneCar } from "../../Redux/Actions/PostActions";
import { useNavigate, useParams } from "react-router-dom";
import { current, getOneUser } from "../../Redux/Actions/AuthActions";
import profile from "../../assets/images/profile.png";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

export default function OneCar() {
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open,setOpen]=useState(false)
  const [openMessageModal,setOpenMessageModal]=useState(false)

  const params = useParams();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const { id } = params;
  useEffect(() => {
    dispatch(getOneCar(id));
  }, []);

  useEffect(() => {
    dispatch(current());
  }, []);
  const currentUser = useSelector((state) => state.AuthReducer.user);
  const car = useSelector((state) => state.PostReducer.onePost);
  console.log(car);
  useEffect(() => {
    dispatch(getOneUser(car.owner));
  }, [car]);
  const owner = useSelector((state) => state.AuthReducer.oneUser);

  return (
    <>
      
      <Headers />
      <div class="container">
     
        <div class="row m-0">
          <div class="col-lg-7 pb-5 pe-lg-5">
            <div class="row">
              <div class="col-12 p-5">
                <Swiper
                  style={{ width: "100%" }}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {Array.isArray(car.image) &&
                    car.image.map((item, key) => (
                      <SwiperSlide>
                        <img src={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div class="row m-0 bg-light">
                <div class="col-md-4 col-6 ps-30 pe-0 my-4">
                  <p class="text-muted">Marque</p>
                  <p class="h5">{car.marque}</p>
                </div>
                <div class="col-md-4 col-6  ps-30 my-4">
                  <p class="text-muted">Modele</p>
                  <p class="h5 m-0">{car.model}</p>
                </div>
                <div class="col-md-4 col-6 ps-30 my-4">
                  <p class="text-muted">Kilometrage</p>
                  <p class="h5 m-0">
                    {car.kilometrage}
                    <span class="ps-1">Km</span>
                  </p>
                </div>
                <div class="col-md-4 col-6 ps-30 my-4">
                  <p class="text-muted">Puissance fiscal</p>
                  <p class="h5 m-0">
                    {car.puissanceF}
                    <span class="ps-1">CV</span>
                  </p>
                </div>
                <div class="col-md-4 col-6 ps-30 my-4">
                  <p class="text-muted">Carburant</p>
                  <p class="h5 m-0">{car.carburant}</p>
                </div>
                <div class="col-md-4 col-6 ps-30 my-4">
                  <p class="text-muted">Annee</p>
                  <p class="h5 m-0">{car.annee}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 p-0 ps-lg-4">
            <div class="row m-0">
              <div class="col-12 px-4">
                <div class="profile-card">
                  <div class="image">
                    <img src={profile} alt="" class="profile-pic" />
                  </div>
                  <div class="data">
                    <h2>{owner.name}</h2>
                  </div>
                  {currentUser&&owner._id === currentUser._id ? (
                    <div class="buttons">
                      <a onClick={()=>navigate('/updateCar/'+car._id)} class="btn">
                        Modifier
                      </a>
                    </div>
                  ) : (
                    <div class="buttons">
                      <a onClick={()=>setOpenMessageModal(true)} href="#" class="btn">
                        Message
                      </a>

                      <a onClick={()=>setOpen(true)} href="#" class="btn">
                        Appeller
                      </a>
                    </div>
                  )}{" "}
                  
                </div>
              </div>
              <div class="col-12 px-0 mt-5">
                <div class="row bg-light m-0">
                  <div class="col-12 px-4 my-4">
                    <text class="fw-bold">Description</text>
                  </div>
                  <div class="col-12 px-4">
                    <p>{car.description}</p>
                  </div>
                  <div class="col-12 px-4 my-4">
                    <text class="fw-bold">Prix</text>
                  </div>
                  <div class="col-12 px-4">
                    <p>{car.prix}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <Modal
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Numero de telephone
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {owner.phone}
    </Typography>
  </Box>
</Modal>

<Modal
  open={openMessageModal}
  onClose={()=>setOpenMessageModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h6">
      Envoyer un message au vendeur
    </Typography>
   <TextField
          id="outlined-textarea"
          multiline
          fullWidth
        />

<Button color="primary" onClick={()=>setOpenMessageModal(false)}>
    Envoyer
  </Button>
  </Box>

  
</Modal>
    </>
  );
}
