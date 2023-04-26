import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutTwo from "../../layouts/LayoutTwo";
import TabProduct from "../../wrappers/product/TabProduct";

const HomePlants = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Home"
        description="Plants home of flone react minimalist eCommerce template."
      />
      <LayoutTwo footerBgClass="bg-gray-4">
        <br />
        <br />
        <br />

        <TabProduct
          spaceTopClass="pt-60"
          spaceBottomClass="pb-70"
          bgColorClass="bg-gray-2"
          category="plant"
        />
        {/* feature icon */}

        {/* newsletter */}
      </LayoutTwo>
    </Fragment>
  );
};

export default HomePlants;
