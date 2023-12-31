import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Order/OrderForm.css";
import { getUser } from "../../api/user";
import { getProduct } from "../../api/product";
import { postSale } from "../../api/sale";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
}

interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Sale {
  userId: string;
  items: SaleItem[];
}

const SaleForm: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchUsers = async () => {
    try {
      const users = await getUser();
      setUsers(users);
    } catch (error) {
      console.error(error);
      // Afficher une notification d'erreur
      toast.error("Erreur dans la récupération des utilisateurs.");
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getProduct();
      setProducts(products);
    } catch (error) {
      console.error(error);
      // Afficher une notification d'erreur
      toast.error("Erreur dans la récupération des produits.");
    }
  };
  useEffect(() => {
    // Récupérer les utilisateurs depuis l'API
    fetchUsers();
    // Récupérer les produits depuis l'API
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 0, price: 0 }]);
  };

  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    const updatedItems = [...items];
    (updatedItems[index] as any)[field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sale: Sale = {
      userId,
      items,
    };

    try {
      const response = await postSale(sale);
      console.log(response.data);

      // Afficher une notification de succès
      toast.success("Vente éffectuée avec succès !");

      // Gérer la réponse réussie
    } catch (error) {
      console.error(error);

      // Afficher une notification d'erreur
      toast.error("Erreur dans la création de la vente.");
    }
  };

  return (
    <div className="form-scroll-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <h1>Vente</h1>
          <label htmlFor="userId">User:</label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Sélectionner un utilisateur</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleAddItem}>
            Ajouter
          </button>
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <label>Produit {index + 1}:</label>
            <div>
              <select
                value={item.productId}
                onChange={(e) =>
                  handleItemChange(index, "productId", e.target.value)
                }
              >
                <option value="">Sélectionner un produit</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Quantité:</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label>Prix:</label>
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", parseInt(e.target.value))
                }
              />
            </div>
          </div>
        ))}
        <div>
          <button type="submit">Vendre</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SaleForm;
