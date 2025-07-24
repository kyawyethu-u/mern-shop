import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import General from "./General";
import Dashbord from "./Dashbord";
import { getAllProducts,getAllUsers } from "../../apicalls/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  BellAlertIcon,
  ChartBarIcon,
  SwatchIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import Notifications from "./Notifications";
import { getAllNoti } from "../../apicalls/notification";


const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users,setUsers] =useState([]);
  const [notifications,setNotifications] = useState()
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [totalProducts,setTotalProducts] = useState()

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getProducts = async (page=1,perPage=10) => {

    try {
      const response = await getAllProducts(page,perPage);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages)
        setTotalProducts(response.totalProducts)
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };
  const getNoti = async()=>{
      try{
        const response = await getAllNoti()
        if(response.isSuccess){
          setNotifications(response.notiDocs)
        }else{
          throw new Error(response.message)    
         }
      }catch(err){
        console.error(err.message)
      }
    }

  useEffect(
    (_) => {
      isAdmin();
      getProducts(1,10);
      getUsers();
      getNoti()
    },
    [activeTabKey]
  );

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <ChartBarIcon width={20} />
          Dashboard
        </span>
      ),
      children: <Dashbord products={products} users={users} totalProducts={totalProducts}/>,
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Manage Products
        </span>
      ),
      children: <Products products={products} getProducts={getProducts} 
      currentPage={currentPage} 
      totalPages={totalPages}/>,
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users users={users} getUsers={getUsers} />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: <Notifications notifications={notifications}/>,
    },
    {
      key: "5",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];
  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default Index;