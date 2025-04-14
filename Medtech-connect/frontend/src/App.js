import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Components/AdminUI/Layouts/AdminLayout";
import AdminDashboard from "./Components/AdminUI/AdminDashboard";
import ManageGroupChats from "./Components/AdminUI/GroupChats/ManageGroupChats";
import Login from "./Components/Login";
import CreateGroupChat from "./Components/AdminUI/GroupChats/CreateGroupChat";
import ManageUserProfiles from "./Components/AdminUI/UserProfile/ManageUserProfiles";
import ManagePostsPage from "./Components/AdminUI/Posts/Pages/ManagePostsPage";
import GroupChatDetails from "./Components/AdminUI/GroupChats/GroupChatDetails";
import UserProfileDetails from "./Components/AdminUI/UserProfile/UserProfileDetails";
import ManageSuspiciousPostsPage from "./Components/AdminUI/SuspiciousPosts/Pages/ManageSuspiciousPostsPage"; // ✅ NEW IMPORT

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Admin Layout with Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* ManageGroupChats as parent route */}
          <Route path="chats" element={<ManageGroupChats />} />
          <Route path="chats/create" element={<CreateGroupChat />} />
          <Route path="chats/edit/:groupId" element={<CreateGroupChat />} />
          <Route path="chats/:groupId" element={<GroupChatDetails />} />

          <Route path="profiles" element={<ManageUserProfiles />} />
          <Route path="profiles/:userId" element={<UserProfileDetails />} />

          <Route path="posts" element={<ManagePostsPage />} />

          <Route path="suspiciousposts" element={<ManageSuspiciousPostsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
