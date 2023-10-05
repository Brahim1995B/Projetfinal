import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchCar } from "../../Redux/Actions/PostActions";
import { useParams } from "react-router-dom";
import PostReducer from "../../Redux/Reducers/PostReducer";
import Headers from "../../components/Header/Header";
import CardCar from "../../components/CardCar/CardCar";
export default function SearchCar() {
  const dispatch = useDispatch();
  const params = useParams();
  const { marque, model } = params;

  useEffect(() => {
    dispatch(getSearchCar({ marque: marque, modele: model }));
  }, []);

  const cars = useSelector((state) => state.PostReducer.searchCars);
  console.log(cars);

  return (
    <>
      <Headers />

      <div className="container">
        <div className="row align-items-center">
          {cars.map((item, key) => (
            <div className="col-md-4" >
                <CardCar car={item}/>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
