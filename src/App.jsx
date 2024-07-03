import { ProductList } from "./assets/components/ProductList";
import { NavBar } from "./assets/components/NavBar";
import "./assets/styles/app.scss";
import Filters from "./assets/components/Filters";
import Tablas from "./assets/components/Tablas";
function App() {
  return (
    <main>
      <NavBar />
      <img
        src="https://placehold.co/1920x400/1d2433/white?text=Banner+slider&font=montserrat"
        alt=""
        className="banner"
        style={{ height: "400px" }}
      />
      <Filters />
      <ProductList className="productList" />
      <Tablas />
    </main>
  );
}

export default App;
