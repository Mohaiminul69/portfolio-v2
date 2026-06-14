import Layout from "./components/Layout";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

const App = () => {
  return (
    <>
      <CustomCursor />
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default App;
