"use client"
import { useEffect, useState } from "react";
import { getElementById, updateElementById } from "@/app/actions/search";
import { useRouter } from 'next/navigation'
import GetUserSession from "@/app/actions/getUserSession";


const Editar = ({ params }) => {



  const router = useRouter();

  const [products, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(params.id);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categorie: "",
    image: "",
  });

  
  const updateElementInDb = async () => {
    try {
      const response = await updateElementById(params.id, productData);

      console.log("Product updated successfully:", response);
      setProductData({
        name: "",
        price: "",
        description: "",
        categorie: "",
        image: "",
      });
    } catch (error) {
      console.error("Error updating product:", Response);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const getData = async () => {
      setProductId(params.id)

      const dataResult = await getElementById(params.id);

      setProducts(dataResult || []);

      // Set initial form data based on fetched product data
      if (dataResult && dataResult.length > 0) {
        const { name, price, description, categorie, image } = dataResult[0];
        setProductData({ name, price, description, categorie, image });
      }
    };
    GetUserSession(
    getData()
    )
  }, [params.id]);


  // const nextProductinList = () => {
  //   setProductId(prevProductId => prevProductId + 1);
  // };

  // useEffect(() => {
  //   router.push(`/products/edit/${productId}`);
  // }, [productId]);


  return (
    <div className="flex justify-center content-center items-center flex-col min-h-screen ">
      {products.map((item, index) => (
        <div
          className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  "
          key={index}
        >
          <form
            className="flex flex-col gap-2 p-1  "
            onSubmit={(e) => {
              e.preventDefault();
              updateElementInDb();
            }}
          >
            <p>ID:{params.id}</p>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              //   className="text-3xl capitalize"
              value={productData.name}
              onChange={handleInputChange}
            />
            <p>Price</p>
            <label htmlFor="price">
              $<input type="text" name="price" value={productData.price} onChange={handleInputChange} />
            </label>
            <label htmlFor="description">Descripcion</label>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="pt-2"
            />
            <label htmlFor="categorie">Categoria</label>
            <input
              type="text"
              name="categorie"
              value={productData.categorie}
              onChange={handleInputChange}
              className="text-black rounded-md p-2 "
            />
            <label htmlFor="image">Imagen</label>
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
              className="text-black  p-2 "
            />




            <button
              type="submit"
              className="bg-slate-600 p-2 rounded-md hover:bg-slate-800 hover:text-white transition"
            >
              Actualizar
            </button>
          </form>

        </div>
      ))}
    </div>
  );
};

export default Editar;
