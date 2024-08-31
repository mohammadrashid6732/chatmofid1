import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../redux/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const fetchUsersHandler = () => {
    if (status === "succeeded") {
      navigate("/userdata");
    }
  };

  return (
    <div>
      {status === "loading" && <p>در حال بارگذاری...</p>}
      {status === "succeeded" && (
        <button onClick={fetchUsersHandler}>دریافت داده‌ها</button>
      )}
    </div>
  );
};

export default Home;
