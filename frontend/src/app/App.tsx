import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { PublicLayout } from "../components/PublicLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginPage } from "../features/auth/LoginPage";
import { HomePage } from "../features/dashboard/HomePage";
import { ManageDashboardPage } from "../features/dashboard/DashboardPage";
import { ManageInventoryPage } from "../features/inventory/InventoryPage";
import { BrowseMedicinesPage } from "../features/medicines/BrowseMedicinesPage";
import { ManageMedicinesPage } from "../features/medicines/MedicinesPage";
import { BrowsePharmaciesPage } from "../features/pharmacies/BrowsePharmaciesPage";
import { ManagePharmaciesPage } from "../features/pharmacies/PharmaciesPage";

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="medicines" element={<BrowseMedicinesPage />} />
        <Route path="pharmacies" element={<BrowsePharmaciesPage />} />
      </Route>

      {/* Protected Management Routes */}
      <Route
        path="/manage"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManageDashboardPage />} />
        <Route path="pharmacies" element={<ManagePharmaciesPage />} />
        <Route path="medicines" element={<ManageMedicinesPage />} />
        <Route path="inventory" element={<ManageInventoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
