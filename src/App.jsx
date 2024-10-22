import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import BlogCategory from "./components/BlogCategory";
import Index from "./components/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import BlogList from "./components/BlogList";
import BlogCategoryList from "./components/BlogCategoryList";
import Blog from "./components/Blog";
import EditBlogcat from "./components/EditBlogCat";
import EditBlog from "./components/EditBlog";
import BusinessAnalysis from "./components/BusinessAnalysis";
import TextEditor from "./components/TextEditor";
import AddService from "./components/AddService";
import ServiceList from "./components/ServiceList";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import AddJob from "./components/AddJob";
import JobList from "./components/JobList";
import EnquiryList from "./components/EnquiryList";
import EditService from "./components/EditService";
import EditProduct from "./components/EditProduct";
import AddAbout from "./components/AddAbout";
import AboutList from "./components/AboutList";
import EditAbout from "./components/EditAbout";
import AddCareer from "./components/AddCareer";
import EditSlider from "./components/EditSlider";
import SliderList from "./components/SliderList";
import AddSlider from "./components/AddSlider";
import AllJobList from "./components/AllJobList";
import UpdatePostedJob from "./components/UpdatePostedJob";
import AddJobPost from "./components/AddJobPost";
import Logout from "./components/Logout";
import AddResource from "./components/AddResource";
import ResourceList from "./components/ResourceList";
import AddCategory from "./component/AddCategory";
import CategoryList from "./component/CategoryList";
import AddSubCategory from "./component/AddSubCategory";
import AddUser from "./component/AddUser";
import AddWallpaper from "./component/AddWallpaper";
import AddQuote from "./component/AddQuote";
import AddColor from "./component/AddColor";
import AddPlan from "./component/AddPlan";
import AddStyle from "./component/AddStyle";
import AddFrame from "./component/AddFrame";
import AddSubscription from "./component/AddSubscription";
import SubCatList from "./component/SubCatList";
import UsersList from "./component/UsersList";
import WallpaperList from "./component/WallpaperList";
import QuotesList from "./component/QuotesList";
import ColorList from "./component/ColorList";
import PlanList from "./component/PlanList";
import StyleList from "./component/StyleList";
import FrameList from "./component/FrameList";
import SubscriptionList from "./component/SubscriptionList";
import TransactionHistory from "./component/TransactionHistory";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >
          <Route path="add-cat" element={<AddCategory />} />
          <Route path="cat-list" element={<CategoryList />} />
          <Route path="add-sub-cat" element={<AddSubCategory />} />
          <Route path="sub-cat-list" element={<SubCatList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="user-list" element={<UsersList />} />
          <Route path="add-wallpaper" element={<AddWallpaper />} />
          <Route path="wallpaper-list" element={<WallpaperList />} />
          <Route path="add-quotes" element={<AddQuote />} />
          <Route path="quotes-list" element={<QuotesList />} />
          <Route path="add-color" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="add-plan" element={<AddPlan />} />
          <Route path="plan-list" element={<PlanList />} />
          <Route path="add-style" element={<AddStyle />} />
          <Route path="style-list" element={<StyleList />} />
          <Route path="add-frame" element={<AddFrame />} />
          <Route path="frame-list" element={<FrameList />} />
          <Route path="add-subscription" element={<AddSubscription />} />
          <Route path="subscription-list" element={<SubscriptionList />} />
          <Route path="subscription-list" element={<SubscriptionList />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
          {/* <Route path="add-slider-data" element={<AddSlider />} />
          <Route path="slider-data-list" element={<SliderList />} />
          <Route path="update-slider/:slider_id" element={<EditSlider />} />
          <Route path="add-about-data" element={<AddAbout />} />
          <Route path="add-data-list" element={<AboutList />} />
          <Route path="add-career" element={<AddCareer />} />
          <Route path="edit-about/:about_id" element={<EditAbout />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="edit-service/:service_id" element={<EditService />} />
          <Route path="edit-product/:product_id" element={<EditProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="job-list" element={<JobList />} />
          <Route path="enquiry" element={<EnquiryList />} />
          <Route path="edit-blog/:blog_id" element={<EditBlog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="add-new-job" element={<AddJobPost />} />
          <Route path="all-posted-job-list" element={<AllJobList />} />
          <Route path="update-job/job_id" element={<UpdatePostedJob />} />
          <Route path="add-resource" element={<AddResource />} />
          <Route path="resource-list" element={<ResourceList />} /> */}
          <Route path="dash_board" element={<BusinessAnalysis />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="ckeditor" element={<TextEditor />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default App;
