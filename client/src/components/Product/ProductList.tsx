import React, { useEffect, useState, useRef } from "react";
import {
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../api/product";
import { ProductType } from "../../models/ProductType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Table.css";
import { useUserContext } from "../context/UserContext";

const ProductList: React.FC = () => {
  const { user } = useUserContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [newProduct, setNewProduct] = useState<ProductType>({
    _id: "",
    name: "",
    type: "",
    quantity: 0,
    pachatkg: 0,
    pventekg: 0,
  });

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const productList = await getProduct();
      setProducts(productList);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateProduct(
    productId: string,
    updatedProduct: ProductType
  ) {
    try {
      await updateProduct(productId, updatedProduct);
      toast.success("Produit mis à jour avec succès !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeField(productId: string, field: string, value: string) {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          [field]: value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  function getStatusClass(quantity: number) {
    if (quantity === 0) {
      return "outOfStock";
    } else if (quantity > 0 && quantity <= 15) {
      return "mediumStock";
    } else {
      return "inStock";
    }
  }

  async function handleCreateProduct() {
    if (
      newProduct.name.trim() !== "" &&
      newProduct.type.trim() !== "" &&
      newProduct.quantity !== 0 &&
      newProduct.pachatkg !== 0 &&
      newProduct.pventekg !== 0
    ) {
      try {
        const createdProduct = await createProduct(newProduct);
        setProducts([...products, createdProduct]);
        setNewProduct({
          _id: "",
          name: "",
          type: "",
          quantity: 0,
          pachatkg: 0,
          pventekg: 0,
        });
        toast.success("Produit crée avec succès !", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Veuillez remplir tout les champs !");
    }
  }

  async function handleDeleteProduct(productId: string) {
    try {
      await deleteProduct(productId);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
      toast.success("Produit supprimé avec succès !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const tableHeader = tableRef.current?.getElementsByTagName("th");
    const tableBody = tableRef.current?.getElementsByTagName("tbody")[0];

    if (tableHeader && tableBody) {
      const handleTableScroll = () => {
        const scrollLeft = tableBody.scrollLeft;

        for (let i = 0; i < tableHeader.length; i++) {
          tableHeader[i].style.transform = `translateX(${scrollLeft}px)`;
        }
      };

      tableBody.addEventListener("scroll", handleTableScroll);

      return () => {
        tableBody.removeEventListener("scroll", handleTableScroll);
      };
    }
  }, []);

  return (
    <div className="table-list">
      <h1>Lise des produits</h1>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Quantité</th>
              <th>Prix au kilo (commande)</th>
              <th>Prix au kilo (vente)</th>
              <th>Statut</th>
              {user.role !== "employees" ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleChangeField(product._id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.type}
                    onChange={(e) =>
                      handleChangeField(product._id, "type", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleChangeField(product._id, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.pachatkg}
                    onChange={(e) =>
                      handleChangeField(product._id, "pachatkg", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.pventekg}
                    onChange={(e) =>
                      handleChangeField(product._id, "pventekg", e.target.value)
                    }
                  />
                </td>
                <td className={getStatusClass(product.quantity)}>
                  {product.quantity === 0
                    ? "Hors stock"
                    : product.quantity <= 15 && product.quantity > 0
                    ? "Stock moyen"
                    : "En stock"}
                </td>
                {user.role !== "employees" ? (
                  <td className="actions">
                    <button
                      className="updateButton"
                      onClick={() => handleUpdateProduct(product._id, product)}
                    >
                      Mettre à jour
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
          {user.role !== "employees" ? (
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newProduct.type}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, type: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newProduct.pachatkg}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pachatkg: parseFloat(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newProduct.pventekg}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        pventekg: parseFloat(e.target.value),
                      })
                    }
                  />
                </td>
                <td></td>
                <td>
                  <button
                    className="createButton"
                    onClick={handleCreateProduct}
                  >
                    Créer
                  </button>
                </td>
              </tr>
            </tbody>
          ) : null}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
