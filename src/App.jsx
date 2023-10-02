import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import Table from "./Table/Table";

const App = () => {


  // Rutas de la aplicación
  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <Table />
      </div>
    </BrowserRouter>
  );
};

export default App;
