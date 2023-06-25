import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkAction } from "../redux/actions/fetchData";
import "./data.css";
import jsonToXlsx from "./download";

const Products = () => {
  const [search, setSearch] = useState("");
  const [view, setView] = useState(false);
  useEffect(() => {
    dispatch(thunkAction());
  }, []);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleExport = () => {
    jsonToXlsx(
      products
        .map(({ images, thumbnail, ...rest }) => rest)
        .filter((item) => selectedItems.includes(item.id)),
      "products.xlsx"
    );
  };

  return (
    <main>
      {products.length === 0 ? (
        "Loading....."
      ) : (
        <>
          <section>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              value={search}
              id="search"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </section>

          <button onClick={handleExport}>export</button>

          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => {
                  return product.title.toLowerCase().includes(search) ||
                    product.brand.toLowerCase().includes(search) ||
                    product.category.toLowerCase().includes(search) ||
                    !search
                    ? product
                    : null;
                })
                .sort((a, b) => b.price - a.price)
                .map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, product.id]);
                            } else {
                              setSelectedItems(
                                selectedItems.filter(
                                  (item) => item !== product.id
                                )
                              );
                            }
                          }}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>
                        <img src={product.thumbnail} alt={product.title} />
                      </td>
                      <td>
                        <button onClick={(e) => setView(!view)}>
                          {view ? "Show less" : "View more "}
                        </button>
                        <br />
                        {view ? product.description : null}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default Products;
