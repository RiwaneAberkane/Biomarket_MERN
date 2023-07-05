import React, { useEffect, useState, useRef } from "react";
import {
  getSupplier,
  updateSupplier,
  createSupplier,
} from "../../api/supplier";
import { SupplierType } from "../../models/SupplierType";
import "../Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [newSupplier, setNewSupplier] = useState<SupplierType>({
    _id: "",
    name: "",
    phoneNumber: 0,
    mail: "",
    adress: "",
    city: "",
  });

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    try {
      const supplierList = await getSupplier();
      setSuppliers(supplierList);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateSupplier(
    supplierId: string,
    updatedSupplier: SupplierType
  ) {
    try {
      await updateSupplier(supplierId, updatedSupplier);
      toast.success("Fournisseur mis à jour avec succès !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeField(
    supplierId: string,
    field: string,
    value: string | number
  ) {
    const updatedSuppliers = suppliers.map((supplier) => {
      if (supplier._id === supplierId) {
        return {
          ...supplier,
          [field]: value,
        };
      }
      return supplier;
    });
    setSuppliers(updatedSuppliers);
  }

  async function handleCreateSupplier() {
    if (
      newSupplier.name.trim() !== "" &&
      newSupplier.phoneNumber !== 0 &&
      newSupplier.mail.trim() !== "" &&
      newSupplier.adress.trim() !== "" &&
      newSupplier.city.trim() !== ""
    ) {
      try {
        // Appeler la fonction createSupplier pour ajouter le nouveau fournisseur
        const createdSupplier = await createSupplier(newSupplier);

        // Mettre à jour la liste des fournisseurs avec le nouveau fournisseur ajouté
        setSuppliers([...suppliers, createdSupplier]);

        // Réinitialiser le formulaire du nouveau fournisseur
        setNewSupplier({
          _id: "",
          name: "",
          phoneNumber: 0,
          mail: "",
          adress: "",
          city: "",
        });

        // Afficher une notification de succès
        toast.success("Fournisseur crée avec succès !", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Il faut remplir tout les champs !");
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
      <h1>Liste des fournisseurs</h1>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Numéro téléphone</th>
              <th>Mail</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>
                  <input
                    type="text"
                    value={supplier.name}
                    onChange={(e) =>
                      handleChangeField(supplier._id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={supplier.phoneNumber}
                    onChange={(e) =>
                      handleChangeField(
                        supplier._id,
                        "phoneNumber",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={supplier.mail}
                    onChange={(e) =>
                      handleChangeField(supplier._id, "mail", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={supplier.adress}
                    onChange={(e) =>
                      handleChangeField(supplier._id, "adress", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={supplier.city}
                    onChange={(e) =>
                      handleChangeField(supplier._id, "city", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="updateButton"
                    onClick={() => handleUpdateSupplier(supplier._id, supplier)}
                  >
                    Mettre à jour
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newSupplier.phoneNumber}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      phoneNumber: parseInt(e.target.value),
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newSupplier.mail}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, mail: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newSupplier.adress}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, adress: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newSupplier.city}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, city: e.target.value })
                  }
                />
              </td>
              <td>
                <button className="createButton" onClick={handleCreateSupplier}>
                  Créer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SupplierList;
