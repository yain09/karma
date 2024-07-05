const sheetId = "1KuwnojNHc20if7X39fw1VeT6aNKmKKjMEPTOLQgs1rM";

async function getProducts() {
  const sheetTitle = "PRODUCTS";
  const fullUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const dataText = await response.text();
    const jsonStartIndex = dataText.indexOf("({");
    const jsonEndIndex = dataText.lastIndexOf("})") + 1;
    const jsonString = dataText.slice(jsonStartIndex + 1, jsonEndIndex);
    const dataJson = JSON.parse(jsonString);
    const rows = dataJson.table.rows;
    const productsData = rows.map((row) => ({
      id: row.c[0].v,
      name: row.c[1].v,
      description: row.c[2].v,
      price: row.c[3].v,
      categories_id: row.c[4].v,
      sub_categories_id: row.c[5].v,
      seamless: row.c[6].v,
      frunce: row.c[7].v,
      sizes_id: row.c[8].v,
      img: row.c[9].v.includes(",") ? row.c[9].v.split(",") : [row.c[9].v],
      colours_id: row.c[10].v,
      stock: row.c[11].v,
    }));
    const images = await Promise.all(
      productsData.map((product) => getImages(product.img))
    );

    const products = productsData.map((product, index) => ({
      ...product,
      img: images[index].map((image) => image.url), // Asignar todas las URLs de imágenes
    }));
    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function getImages(images_id) {
  const sheetTitle = "IMAGES";
  const fullUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const dataText = await response.text();
    const jsonStartIndex = dataText.indexOf("({");
    const jsonEndIndex = dataText.lastIndexOf("})") + 1;
    const jsonString = dataText.slice(jsonStartIndex + 1, jsonEndIndex);
    const dataJson = JSON.parse(jsonString);
    const rows = dataJson.table.rows;
    const images = rows.map((row) => ({
      id: row.c[0].v,
      url: row.c[1].v,
      products_id: row.c[2].v,
    }));
    const filteredImages = images.filter((image) =>
      images_id.includes(image.id.toString())
    );
    return filteredImages;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function filterProducts(categoryId, subCategoryId, sizeId) {
  const products = await getProducts();
  const categoryFilteredProducts = products.filter((product) => {
    return categoryId < 0 || categoryId == product.categories_id;
  });
  const subCategoryFilteredProducts = categoryFilteredProducts.filter(
    (product) => {
      return subCategoryId < 0 || subCategoryId == product.sub_categories_id;
    }
  );
  const filteredProducts = subCategoryFilteredProducts.filter((product) => {
    return sizeId < 0 || sizeId == product.sizes_id;
  });
  return filteredProducts;
}

async function getCategories() {
  const sheetTitle = "CATEGORIES";
  const fullUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const dataText = await response.text();
    const jsonStartIndex = dataText.indexOf("({");
    const jsonEndIndex = dataText.lastIndexOf("})") + 1;
    const jsonString = dataText.slice(jsonStartIndex + 1, jsonEndIndex);
    const dataJson = JSON.parse(jsonString);
    const rows = dataJson.table.rows;
    const categories = rows.map((row) => ({
      id: row.c[0].v,
      name: row.c[1].v,
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function getSubCategories(category_id) {
  const sheetTitle = "SUB_CATEGORIES";
  const fullUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const dataText = await response.text();
    const jsonStartIndex = dataText.indexOf("({");
    const jsonEndIndex = dataText.lastIndexOf("})") + 1;
    const jsonString = dataText.slice(jsonStartIndex + 1, jsonEndIndex);
    const dataJson = JSON.parse(jsonString);
    const rows = dataJson.table.rows;
    const subCategories = rows.map((row) => ({
      id: row.c[0].v,
      name: row.c[1].v,
      categories_id: row.c[2].v,
    }));
    let filteredSubCategories;
    if (category_id > 0) {
      filteredSubCategories = subCategories.filter(
        (subCategory) => subCategory.categories_id == category_id
      );
    } else {
      filteredSubCategories = subCategories;
    }
    return filteredSubCategories;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export { getProducts, filterProducts, getCategories, getSubCategories };
