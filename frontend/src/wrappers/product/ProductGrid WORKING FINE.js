import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";

const ProductGrid = ({ spaceBottomClass, category, type, limit }) => {
  const currency = useSelector((state) => state.currency);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsFromDatabase();
  }, []);

  async function getAllProductsFromDatabase() {
    await fetch("http://localhost:8002/product/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }

  return (
    <Fragment>
      {products?.map((product) => {
        return (
          <div
            className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
            key={product._id}
          >
            <ProductGridSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGrid;
