import React from "react";
import { OrderItemType } from "../../models/OrderItemType";
import { ProductType } from "../../models/ProductType";
import "./OrderItemDetails.css";

interface OrderItemDetailsProps {
  orderItems: OrderItemType[];
}

function renderProduct(product: ProductType | undefined): React.ReactNode {
  if (!product) {
    return null;
  }

  return <span>{product.name}</span>;
}

const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ orderItems }) => {
  return (
    <div className="order-item-details">
      <h2>Détail de la commande</h2>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix (unitaire)</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((orderItem) => (
            <tr key={orderItem._id.toString()}>
              <td>{renderProduct(orderItem.product)}</td>
              <td>{orderItem.quantity}</td>
              <td>{orderItem.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItemDetails;
