import "assets/GlobalStyles.scss";

import MainLayout from "layout/MainLayout";
import { router } from "routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {router.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <MainLayout>
                    <Page />
                  </MainLayout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
