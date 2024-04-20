"use client"
import { useEffect, useState } from "react";
import { getElementById, updateElementById } from "@/app/actions/search";
import SearchByCategorie from "@/app/actions/searchByCategorie";
import { useRouter } from 'next/navigation'
import SimpleSlider from "../../simple-slider/page";


const Editar = ({ params }: any) => {

    const [imageIndex, setImageIndex] = useState(0)
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const router = useRouter();

    const [products, setProducts] = useState<any>([]);
    const [productId, setProductId] = useState<number>(params.id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [recomendationData, setRecomendationData] = useState<any>([])

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        categorie: "",
        image: "",
        gallery: []
    });


    const handleImageClick = (index: any) => {
        setSelectedImageIndex(index);
    };


    const nextItem = () => {
        if (imageIndex >= images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex((prevState) => prevState + 1);
        }
    };

    const prevItem = () => {
        if (imageIndex <= 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex((prevState) => prevState - 1);
        }
    };



    useEffect(() => {
        const getData = async () => {
            setProductId(params.id)

            const dataResult = await getElementById(params.id);

            setProducts(dataResult || []);

            // Set initial form data based on fetched product data
            if (dataResult && dataResult.length > 0) {
                const { name, price, description, categorie, image, gallery } = dataResult[0];
                setProductData({ name, price, description, categorie, image, gallery });

                let categoriesData = await SearchByCategorie(categorie)
                setRecomendationData(categoriesData?.data)


                try{
                    console.log(categoriesData)

                }catch(e){
                    console.error(e)
                }

            }


            

        };
        getData();
    }, [params.id]);




    return (
        <div className="flex justify-center content-center items-center flex-col min-h-screen ">
            {products.map((item: any, index: number) => (
                <div
                    className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  "
                    key={index}
                >
                    <div
                        className="flex flex-col gap-2 p-1  "

                    >
                        {/* <p>ID:{params.id}</p> */}

                        <p>{productData.name}</p>
                        <p>${productData.price}</p>
                        <p>

                            {productData.description}

                        </p>
                        <p>
                            {productData.categorie}


                        </p>
                        <img
                            src={productData.image}
                            alt={`Image of product ${productData.name}`}
                        />




                    </div>

                </div>
            ))}
            {/* <ImageGallery items={images} /> */}

            <div className="w-auto flex items-center justify-center flex-col">
                <img className=" object-cover aspect-video w-1/2 " src={productData.gallery[imageIndex]?.original} alt={`Image of ${productData.name}`} />
                <div className=" flex items-center justify-center  object-cover aspect-video " >
                    {productData.gallery.map((image: any, index: number) => (
                        <img
                            className="object-cover aspect-video w-1/4  "
                            key={index}
                            src={image.original}
                            alt={`Image of  ${productData.name}`}
                        />
                    ))}
                </div>

                <div className="flex items-center  justify-between gap-6">
                    <button className="text-4xl" onClick={() => prevItem()}> {"<"} </button><button className="text-4xl" onClick={() => nextItem()}>{">"}</button>

                </div>
            </div>

            <SimpleSlider widthCarrousel={300} HeigthCarrousel={400} items={recomendationData} />

            {/* {recomendationData.map((item: any, index: number) => (
                <div
                    className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  "
                    key={index}
                >
                    <div
                        className="flex flex-col gap-2 p-1  "

                    >
                        {/* <p>ID:{params.id}</p> */}

                        {/* <p>{item.name}</p> */}
                        {/* <p>${item.price}</p> */}
                        {/* <p> */}

                            {/* {item.description} */}

                        {/* </p> */}
                        {/* <p> */}
                            {/* {item.categorie} */}


                        {/* </p> */}
                        {/* <img */}
                            {/* src={item.image} */}
                            {/* alt={`Image of product ${item.name}`} */}
                        {/* /> */}




                    {/* </div> */}

                {/* </div> */}
            {/* ))} */} 
            
        </div>
    );
};

export default Editar;
