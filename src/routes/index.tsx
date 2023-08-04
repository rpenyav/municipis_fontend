import React, { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
const HomePage = lazy(() => import("../pages/HomePage"));
const ComarcaView = lazy(() => import("../pages/ComarcaView"));
const ProvinciaView = lazy(() => import("../pages/ProvinciaView"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comarca/:idcomarca/:nom" element={<ComarcaView />} />
        <Route
          path="/provincia/:idprovincia/:nom"
          element={<ProvinciaView />}
        />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* Añade más rutas según sea necesario */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
