import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/userSlice";
import styles from "../styles/UserData.module.css"; // وارد کردن فایل استایل
import { Link } from "react-router-dom";

const UserData = () => {
  const { users, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users && status !== "loading") {
      dispatch(fetchUsers());
    }
  }, [dispatch, users, status]);

  return (
    <div className={styles.container}>
      <h1>اطلاعات کاربران</h1>
      {status === "loading" && (
        <p className={styles.loading}>در حال بارگذاری...</p>
      )}
      {status === "failed" && (
        <p className={styles.error}>خطا: {error || "هیچ کاربری یافت نشد."}</p>
      )}
      {status === "succeeded" && users && (
        <ul className={styles.userList}>
          <li key={users.id}>
            <p>
              <strong>id:</strong> {users.id}
            </p>
            <p>
              <strong>chat_id: </strong> {users.chat_id}
            </p>
            <p>
              <strong>token:</strong> {users.token}
            </p>
            <p>
              <strong>chat-server_url:</strong> {users.chat_server.url}
            </p>
            <p>
              <strong>port:</strong> {users.chat_server.port}
            </p>
            <p>
              <strong>path:</strong> {users.chat_server.path}
            </p>
            <p>
              <strong>scheme:</strong> {users.chat_server.scheme}
            </p>
            <p>
              <strong>ws_path:</strong> {users.chat_server.ws_path}
            </p>
            <p>
              <strong>ws_scheme:</strong> {users.chat_server.ws_scheme}
            </p>
          </li>
        </ul>
      )}
      {status === "succeeded" && <Link to="/chatlist">chat List</Link>}
    </div>
  );
};

export default UserData;
