import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Sidebar } from "./modules/SidebarLists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statistic from "./modules/StatisticSidebar/Components/Statistic/Statistic";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { setState } from "./store/todo/todoSlice";
import MainPage from "./pages/MainPage/MainPage";
import { CompletedTodosPage } from "./pages/CompletedTodosPage/CompletedTodosPage";
import { setUserInfo, toggleLogin } from "./store/userInfo/userInfoSlice";
import { RegistrationForm } from "./modules/RegistrationForm";
import { LoginForm, LoginApi } from "./modules/LoginForm";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import {changeScreenWidth} from "./store/screenWidth/screenWidthSlice";

export default function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registrationPopup, setRegistrationPopup] = useState(false);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const isLogined = useAppSelector(state => state.userInfo.isLogined)

  useEffect(() => {
    const cb = async () => {
      const result = await LoginApi.getInfo(localStorage.getItem("idToken")!);
      if (result) {
        dispatch(setUserInfo(result.users[0]));
        dispatch(toggleLogin());
      }
      dispatch(changeScreenWidth())
      setPageIsLoaded(true);
      window.addEventListener("resize", () => dispatch(changeScreenWidth()));
    };
    cb();
    return () => window.removeEventListener("resize", () => dispatch(changeScreenWidth()));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      dispatch(setState(JSON.parse(localStorage.getItem("todos")!)));
    }
  }, []);
  return (
    <BrowserRouter>
      {pageIsLoaded ? (
        <div className="App">
          <Header />
          <div className="wrapper">
            {isLogined && <Sidebar />}
            <LoginForm loginPopup={loginPopup} setLoginPopup={setLoginPopup} setRegistrationPopup={setRegistrationPopup} />
            <RegistrationForm registrationPopup={registrationPopup} setRegistrationPopup={setRegistrationPopup} />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<MainPage setLoginPopup={setLoginPopup} />} />
                <Route path="/:listName" element={<TodoListPage setLoginPopup={setLoginPopup} />} />
                <Route path="/completed" element={<CompletedTodosPage />} />
              </Routes>
            </div>
            {isLogined && <Statistic />}
          </div>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </BrowserRouter>
  );
}
