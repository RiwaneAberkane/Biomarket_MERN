import React from "react";
import { SaleItemType } from "../../models/SaleItemType";
import { ProductType } from "../../models/ProductType";

interface SaleItemDetailsProps {
  saleItems: SaleItemType[];
}

function renderProduct(product: ProductType | undefined): React.ReactNode {
  if (!product) {
    return null;
  }

  return <span>{product.name}</span>;
}

const SaleItemDetails: React.FC<SaleItemDetailsProps> = ({ saleItems }) => {
  return (
    <div className="order-item-details">
      <h2>Détail de la vente</h2>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix (unitaire)</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map((saleItem) => (
            <tr key={saleItem._id.toString()}>
              <td>{renderProduct(saleItem.product)}</td>
              <td>{saleItem.quantity}</td>
              <td>{saleItem.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleItemDetails;
