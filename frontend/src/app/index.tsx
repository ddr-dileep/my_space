
// import { backGroundImage } from "../constants/images-bg";
import { TypeAnimation } from "react-type-animation";
import "./style.scss";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <div className="app">
      <main className="app-main">
        {" "}
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "We produce food ", // initially rendered starting point
            1000,
            "We produce food for Hamsters",
            1000,
            "We produce food for Guinea Pigs",
            1000,
            "We produce food for Chinchillas",
            500,
          ]}
          speed={50}
          style={{ fontSize: "2em" }}
          repeat={Infinity}
        />
      </main>
    </div>
  );
};

export default App;
