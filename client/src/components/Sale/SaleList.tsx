import React, { useEffect, useState } from "react";
import { getAllSales } from "../../api/sale";
import { getSaleItemsBySaleId } from "../../api/saleItem";
import SaleType from "../../models/SaleType";
import { getUserById } from "../../api/user";
import { SaleItemType } from "../../models/SaleItemType";
import { Link } from "react-router-dom";
import SaleItemDetails from "./SaleItemDetails";

interface SaleListProps {}

const SaleList: React.FC<SaleListProps> = () => {
  const [sales, setSales] = useState<SaleType[]>([]);
  const [selectedSaleId, setSelectedSaleId] = useState<string>("");
  const [selectedSaleItems, setSelectedSaleItems] = useState<SaleItemType[]>(
    []
  );
  const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    try {
      const saleList = await getAllSales();
      setSales(saleList);

      const userIds = saleList.map((sale) => sale.user.toString());

      // Fetch user emails
      const userEmailData = await Promise.all(
        userIds.map((userId) => getUserEmail(userId))
      );
      const userEmailMap: { [key: string]: string } = {};
      userEmailData.forEach((email, index) => {
        userEmailMap[userIds[index]] = email;
      });
      setUserEmails(userEmailMap);
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

  async function fetchSaleItems(saleId: string) {
    try {
      const saleItems = await getSaleItemsBySaleId(saleId);
      setSelectedSaleItems(saleItems || []);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleDropdown(saleId: string) {
    if (selectedSaleId === saleId) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(true);
      setSelectedSaleId(saleId);
    }
  }

  function handleRowClick(saleId: string) {
    fetchSaleItems(saleId);
    toggleDropdown(saleId);
  }

  return (
    <div className="order-table-container">
      <h1>Lise des ventes</h1>
      <Link to="/sale/create" className="create-order-button">
        <button> Créer une vente</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Prix total</th>
            <th>Effectuée le</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <React.Fragment key={sale._id.toString()}>
              <tr onClick={() => handleRowClick(sale._id.toString())}>
                <td>{userEmails[sale.user.toString()]}</td>
                <td>{sale.totalPrice}</td>
                <td>{sale.createdAt.toString()}</td>
              </tr>
              {isDropdownOpen && selectedSaleId === sale._id.toString() && (
                <tr>
                  <td colSpan={5}>
                    <SaleItemDetails saleItems={selectedSaleItems} />
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

export default SaleList;
