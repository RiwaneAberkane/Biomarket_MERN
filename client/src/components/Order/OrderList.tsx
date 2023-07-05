import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api/order";
import { getOrderItemsByOrderId } from "../../api/orderItem";
import OrderType from "../../models/OrderType";
import { getUserById } from "../../api/user";
import { getSupplierById } from "../../api/supplier";
import { OrderItemType } from "../../models/OrderItemType";
import OrderItemDetails from "./OrderItemDetails";
import { Link } from "react-router-dom";
import "./OrderList.css";

interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItemType[]>(
    []
  );
  const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});
  const [supplierNames, setSupplierNames] = useState<{ [key: string]: string }>(
    {}
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const orderList = await getAllOrders();
      setOrders(orderList);

      const userIds = orderList.map((order) => order.user.toString());
      const supplierIds = orderList.map((order) => order.supplier.toString());

      // Fetch user emails
      const userEmailData = await Promise.all(
        userIds.map((userId) => getUserEmail(userId))
      );
      const userEmailMap: { [key: string]: string } = {};
      userEmailData.forEach((email, index) => {
        userEmailMap[userIds[index]] = email;
      });
      setUserEmails(userEmailMap);

      // Fetch supplier names
      const supplierNameData = await Promise.all(
        supplierIds.map((supplierId) => getSupplierName(supplierId))
      );
      const supplierNameMap: { [key: string]: string } = {};
      supplierNameData.forEach((name, index) => {
        supplierNameMap[supplierIds[index]] = name;
      });
      setSupplierNames(supplierNameMap);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserEmail(userId: string): Promise<string> {
    try {
      const user = await getUserById(userId);
      if (user) {
        return user.email;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async function getSupplierName(supplierId: string): Promise<string> {
    try {
      const supplier = await getSupplierById(supplierId);
      if (supplier) {
        return supplier.name;
      } else {
        throw new Error("Supplier not found");
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async function fetchOrderItems(orderId: string) {
    try {
      const orderItems = await getOrderItemsByOrderId(orderId);
      setSelectedOrderItems(orderItems || []);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleDropdown(orderId: string) {
    if (selectedOrderId === orderId) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(true);
      setSelectedOrderId(orderId);
    }
  }

  function handleRowClick(orderId: string) {
    fetchOrderItems(orderId);
    toggleDropdown(orderId);
  }

  return (
    <div className="order-table-container">
      <h1>Liste des commandes</h1>
      <Link to="/order/create" className="create-order-button">
        <button> Créer Commande</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Fournisseur</th>
            <th>Prix total</th>
            <th>Passée le</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id.toString()}>
              <tr onClick={() => handleRowClick(order._id.toString())}>
                <td>{userEmails[order.user.toString()]}</td>
                <td>{supplierNames[order.supplier.toString()]}</td>
                <td>{order.totalPrice}</td>
                <td>{order.createdAt.toString()}</td>
              </tr>
              {isDropdownOpen && selectedOrderId === order._id.toString() && (
                <tr>
                  <td colSpan={5}>
                    <OrderItemDetails orderItems={selectedOrderItems} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
