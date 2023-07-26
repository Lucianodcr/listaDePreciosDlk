import React from "react";
import Table from "./Table/Table";

const App = () => {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">
        Lista de Precios Actualizada a la Fecha de Hoy
        <span className="text-sm font-normal ml-2">{currentDate}</span>
      </h1>
      <Table />
    </div>
  );
};

export default App;