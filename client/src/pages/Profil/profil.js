import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { current, deleteProfile } from "../../Redux/Actions/AuthActions";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import profile from "../../assets/images/profile.png";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form, Link, useNavigate } from "react-router-dom";
import Headers from "../../components/Header/Header";
import "./style.css";
import CardCar from "../../components/CardCar/CardCar";
import { getMyCars } from "../../Redux/Actions/PostActions";
import { CoPresent, MyLocation } from "@mui/icons-material";

//import MyPosts from './Posts/MyPosts';

const Profile = () => {
  const [show, setShow] = useState(false);
  const [cars,setCars]= useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    dispatch(getMyCars(user?._id));
  }, [user]);

  const myCars = useSelector((state) => state.PostReducer.myposts);
  console.log(myCars)


  const navigate = useNavigate();
  if (!user) {
    return <Navigate replace to="/signin  " />;
  } else {
  return (
    <div>
      <Headers />
      <div className="container ">
        <section class="main">
          <div class="profile-card">
            <div class="image">
              <img src={profile} alt="" class="profile-pic" />
            </div>
            <div class="data">
              <h2>{user.name}</h2>
            </div>
            <div class="row">
              <div class="info">
                <h3>Publications</h3>
                <span>{myCars.Allposts!==undefined&&myCars.Allposts.length}</span>
              </div>
            </div>
            <div class="buttons">
              <a href="#" class="btn">
                Message
              </a>
              <a href="#" class="btn">
                Appeller
              </a>
            </div>
          </div>
        </section>
        <div className="row">
          {(myCars.Allposts!==undefined&&myCars.Allposts.length > 0 &&user)&&myCars.Allposts.map((item, key) => (
            <div className="col-lg-4">
              <CardCar car={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}};

export default Profile;
