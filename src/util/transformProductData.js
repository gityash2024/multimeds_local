const transformProductData = (productData) => {
    return productData.map(product => ({
      id: product["Sl No"],
      productName: product["Short Title"],
      marketer: product["Marketer"],
      unitsInPack: product["Unit (s) in Pack"],
      maxRetailPrice: product["MRP"],
      sp: product["SP"],
      discount: product["Discount %"],
      productImages: [product["productImages"]], 
      description: product["Description"],
      prescriptionRequired: product["OTC/RX"] === "RX" ,
      bulletPoint5:product["Bullet point 5"],
      bulletPoint4:product["Bullet point 4"],
      bulletPoint3:product["Bullet point 3"],
      bulletPoint2:product["Bullet point 2"],
      bulletPoint1:product["Bullet point 1"],
      safetyinformation:product["Safety information"]
    }));
  };
  
  export default transformProductData;
  