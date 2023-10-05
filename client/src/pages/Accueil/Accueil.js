import react, { useEffect, useState } from "react";
import Headers from "../../components/Header/Header";
import CardCar from "../../components/CardCar/CardCar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { getAllCars, getSearchCar } from "../../Redux/Actions/PostActions";
import { useDispatch, useSelector } from "react-redux";
import cars from "../Cars/car-list.json";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/carbackground.png";
export default function Accueil(props) {
  const [marqueSelectedIndex, setMarqueSelectedIndex] = useState(null);
  const [marque, setMarque] = useState("");
  const [model, setModel] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  const carState = useSelector((state) => state.PostReducer.posts);
  console.log(carState);

  const handleChangeMarque = (value) => {
    const index = cars.findIndex((element) => element.brand === value);
    setMarqueSelectedIndex(index);
    setMarque(value);
  };

  const findCar = () => {
    navigate("/search_car/" + marque + "/" + model);
  };
  return (
    <>
      <Headers />

      <section id="search" style={{ minHeight: 300 }}>
        <div className="container accueil  search-block ">
          <div>
            <img src={backgroundImage} style={{width:"100%",maxHeight:300}}/>
          </div>
          <form className="row">
            <div className="col-6 col-md-6 col-lg-6  mt-lg-0">
              <text
                for="vehicle"
                className="label-style text-capitalize form-label"
              >
                Marque
              </text>
              <div className="input-group date ">
                <select
                  className="form-select form-control p-3"
                  id="vehicle"
                  aria-label="Default select example"
                  onChange={(e) => handleChangeMarque(e.target.value)}
                  value={marque}
                >
                  <option selected>Select Vehicle Type</option>
                  {cars.map((item, key) => (
                    <option className="form-control" value={item.brand}>
                      {item.brand}
                    </option>
                  ))}
                </select>
                <span className="search-icon-position position-absolute p-3 ">
                  <iconify-icon
                    className="search-icons"
                    icon="solar:bus-outline"
                  />
                </span>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-6  mt-lg-0">
              <text
                for="vehicle"
                className="label-style text-capitalize form-label"
              >
                Modele
              </text>
              <div className="input-group date ">
                <select
                  className="form-select form-control p-3"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  value={model}
                >
                  <option selected>Select Vehicle Type</option>
                  {marqueSelectedIndex !== null &&
                    cars[marqueSelectedIndex].models.map((item, key) => (
                      <option value={item}>{item}</option>
                    ))}
                </select>
                <span className="search-icon-position position-absolute p-3 ">
                  <iconify-icon
                    className="search-icons"
                    icon="solar:bus-outline"
                  />
                </span>
              </div>
            </div>
          </form>

          <div className="d-grid gap-2 mt-4">
            <button
              onClick={() => findCar()}
              className="btn btn-primary "
              type="button"
            >
              Find your car
            </button>
          </div>
        </div>
      </section>

      <div className=" process-content container">
        <h2 className=" text-center  ">
          Our renting <span className="text-primary"> process </span>{" "}
        </h2>
        <hr className="progress-line" />
        <div className="row process-block" style={{ marginTop: -30 }}>
          <div className="col-4 col-lg-4 text-start ">
            <div className="bullet" />
            <h5 className="text-uppercase mt-5"> Choisir votre voiture </h5>
            <p>Sed euismod mauris corper libero.</p>
          </div>

          <div className="col-4 col-lg-4 text-start ">
            <div className="bullet" />
            <h5 className="text-uppercase mt-5">Contacter le vendeur </h5>
          </div>

          <div className="col-4 col-lg-4 text-start ">
            <div className="bullet" />
            <h5 className="text-uppercase mt-5">
              Securise de paiement a travers notre site{" "}
            </h5>
          </div>
        </div>
      </div>

      <section id="rental" className="position-relative">
        <div className="container my-5 py-5">
          <h2 className=" text-center my-5">
            Voiture <span className="text-primary"> Avendre </span>{" "}
          </h2>

          <div className="swiper rental-swiper mb-5">
            <div className="swiper-wrapper">
              <Swiper
                style={{ width: "100%" }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {carState.map((item, key) => (
                  <SwiperSlide>
                    <CardCar car={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
