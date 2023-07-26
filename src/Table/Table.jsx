import { useState, useEffect } from "react";
import { fetchMockData } from "../asyncmock";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    fetchMockData().then((data) => {
      setData(data);
      setFilteredData(data);
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm]);

  const filterData = () => {
    const filtered = data.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const localidadLower = item.Localidad.toLowerCase();
      const partidoLower = item.Partido.toLowerCase();
      const cordonLower = item.Cordon.toLowerCase();
      const precioLower = item.Precio.toString().toLowerCase();

      return (
        localidadLower.includes(searchTermLower) ||
        partidoLower.includes(searchTermLower) ||
        cordonLower.includes(searchTermLower) ||
        precioLower.includes(searchTermLower)
      );
    });
    setFilteredData(filtered);
  };

  const updatePrice = (cordon, newPrice) => {
    const updatedData = data.map((item) => {
      if (item.Cordon === cordon) {
        return { ...item, Precio: newPrice };
      }
      return item;
    });

    setData(updatedData);
    setFilteredData(updatedData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por Localidad, Partido, Cordón o Precio"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-purple-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-purple-800 text-white">
              <th className="p-4 text-center">Localidad</th>
              <th className="p-4 text-center">Partido</th>
              <th className="p-4 text-center">Cordón</th>
              <th className="p-4 text-center">Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-purple-100"}
              >
                <td className="p-4 text-center">{item.Localidad}</td>
                <td className="p-4 text-center">{item.Partido}</td>
                <td className="p-4 text-center">{item.Cordon}</td>
                <td className="p-4 text-center">${item.Precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
