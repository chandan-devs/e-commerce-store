import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { remove } from "../store/cartSlice.js";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <h1 className="text-center p-7 font-extrabold text-4xl">CART</h1>
      <div className="p-4">
        {cart.length === 0 && (
          <p className="text-center font-semibold">
            Your cart is empty. Add some products to your cart.
          </p>
        )}

        {cart.length > 0 && (
          <p className="text-center font-semibold">
            You have {cart.length} products in your cart.
          </p>
        )}
      </div>
      <div className="">
        {cart.map((product) => {
          return (
            <div
              key={product.id}
              className="p-4 rounded-md m-2 flex justify-center flex-col items-center gap-4"
            >
              <div className="flex justify-center items-center w-60 h-60 border">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-44 h-44 aspect-square rounded-md"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-semibold">Title: {product.title}</p>
                <p className="font-semibold">Price: {product.price}$</p>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="bg-blue-500 text-white inline-block p-2 rounded-md"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center p-4">
        <button
          className="bg-blue-500 text-white inline-block p-2 rounded-md"
          onClick={() => dispatch({ type: "cart/clear" })}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
