import React, { Fragment, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useEffect } from "react";

const Product = () => {
  const { pathname } = useLocation();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState("");

  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    quantity: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    image: "",
    __v: 0,
    _id: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8002/product/${id}`);
      const json = await response.json();

      if (response.ok) {
        setProduct({
          productId: `${json["productId"]}`,
          name: `${json["name"]}`,
          price: `${json["price"]}`,
          quantity: `${json["quantity"]}`,
          shortDescription: `${json["shortDescription"]}`,
          fullDescription: `${json["fullDescription"]}`,
          category: `${json["category"]}`,
          image: `${json["image"]}`,
          __v: 0,
          _id: `${json["_id"]}`,
        });

        setProductId(json["productId"]);
        setName(json["name"]);
        setPrice(json["price"]);
        setQuantity(json["quantity"]);
        setShortDescription(json["shortDescription"]);
        setFullDescription(json["fullDescription"]);
        setCategory(json["category"]);
        setImage(json["image"]);
      } else {
        console.log("failed");
      }
    };
    fetchProduct();
  }, [setProduct]);

  console.log("product details");
  console.log(product);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
