import React, { createContext, useState } from 'react'
const Context = createContext({});
export default Context;

export function AppContext({children}) {
    const [selectedProduct, setSelectedProduct] = useState({
        "id":1,
        "productName": "Kapiva Noni Juice (1L) - Rich in Antioxidants, Boosts Energy, Builds Immunity, Natural Detoxifier",
        "Category": "Plant based supplement",
        "Brand": "Kapiva",
        "Discount coupon code & Discount expiry": "",
        "Storage Instructions": "Store in cool & dry place away from direct sunlight ,use within 30 days of opening ,avoid during pregnancy.",
        "Composition": "Methyl salicylate, Diethyl phthalate, Castor oil, Industrial methylated spirit",
        "Country of Origin": "India",
        "Adding Stock": 50,
        "productImages": ["https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61az41InmzL._SL1080_.jpg"],
        "description": "Multicure Doctor's Surgical Spirit I.P. is used as an antiseptic and disinfectant for cleaning and sanitizing wounds, cuts, and abrasions. It contains alcohol and can be used as a skin cleanser before surgery and injections.",
       "price":300,
       "Manufacturer":"Apollo",
       "isPrescription":true,
       "unitsInPack": 1,
       "maxRetailPrice":230,
        "discount": 10,
        "sp":207
      });
  return (
    <Context.Provider value={{selectedProduct, setSelectedProduct}}>
        {children}
    </Context.Provider>
  )
}
