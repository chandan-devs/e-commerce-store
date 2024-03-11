import { useEffect } from "react";
import { add } from "../store/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productSlice.js";

const Product = () => {
  // const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.data);
  // const status = useSelector((state) => state.product.status);
  const { status, data: products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
    // const fetchProduct = async () => {
    //   try {
    //     const response = await fetch("https://fakestoreapi.com/products");
    //     const data = await response.json();
    //     console.log(data);
    //     setProducts(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchProduct();
  }, []);

  const handleAdd = (product) => {
    console.log(product);
    dispatch(add(product));
  };
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/src/assets/Spinner-5.gif" alt="preloader" />
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/src/assets/Ghost.gif" alt="preloader" />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="text-center p-7 font-extrabold text-4xl">PRODUCTS</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="border p-4 w-96 h-80 relative flex flex-col gap-4"
              >
                <div className="flex justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square w-36 flex justify-center"
                  />
                </div>
                <div className="text-center font-semibold">
                  <h3 className="mb-4">
                    <span className="font-extrabold">Title:</span>{" "}
                    {product.title}
                  </h3>
                  <p>
                    <span className="font-extrabold">Price: </span>
                    {product.price}$
                  </p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded absolute bottom-1"
                  onClick={() => handleAdd(product)}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default Product;
