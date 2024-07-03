import { useEffect, useState } from "react";

function Tablas() {
  useEffect(() => {
    const sheetId = "1KuwnojNHc20if7X39fw1VeT6aNKmKKjMEPTOLQgs1rM";
    const sheetTitle = "PRODUCTS";
    const fullUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
    console.log(fullUrl);
    fetch(fullUrl)
      .then((res) => res.text())
      .then((rep) => {
        const data = JSON.parse(rep.substr(47).slice(0, -2));
        const tabla = data.table.rows;
        console.log(tabla);
        const formatedDataArray = tabla.map((fila) => ({
          id: fila.c[0].v,
          name: fila.c[1].v,
          description: fila.c[2].v,
          price: fila.c[3].v,
          categories_id: fila.c[4].v,
          sub_categories_id: fila.c[5].v,
          seamless: fila.c[6].v,
          frunce: fila.c[7].v,
          sizes_id: fila.c[8].v,
          images_id: fila.c[9].v.split(","),
          colours_id: fila.c[10].v,
          stock: fila.c[11].v,
        }));

        console.log(formatedDataArray);
      });
  }, []);

  return <div>Tablas</div>;
}

export default Tablas;
