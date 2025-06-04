import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CContainer } from "@coreui/react";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    element={<route.component />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
