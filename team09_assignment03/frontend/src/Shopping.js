import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(0);
  const [id, setInput] = useState();
  const [price, setPrice] = useState(0);

  const [dataF, setDataF] = useState("");
  const { register, handleSubmit, formState: { errors }, unregister } = useForm();
  const formRef = useRef(null);

  /*
   * This method allows us to change our view.
   */
  function handleClick(input) {
    setView(input);
  };

  /*
   * This view shows all of the products and some information about them.
   */
  function showAllProducts() {
    const allProducts = products.map((el) => (
      <div class="row border-top border-bottom" key={el.id}>
        <div class="row main align-items-center">
          <div class="col-2">
            <img class="img-fluid" src={el.image} width='150px' alt='product' />
          </div>
          <div class="col">
            <div class="row text-muted">{el.title}</div>
            <div class="row">{el.category}</div>
            <div class="row">{el.price}</div>
            <div class="row">{el.rating.count} Ratings</div>
            <div class="row">Rate: {el.rating.rate}</div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header>
        <h1>Products:</h1><br />
        <div>{allProducts}</div>
      </div>
    );
  }

  /*
   * This method updates the products array.
   */
  useEffect(() => {
    fetch("http://localhost:8081/listProducts")
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      })
  }, []);

  /*
   * This is the frontend method for getting all of the products
   * (get request)
   */
  function getProducts() {
    fetch("http://localhost:8081/listProducts")
      .then(response => response.json())
      .then(products => { setProducts(products) });
  }

  /*
   * This view shows more information about a product.
   * This is also the view where users can update a products price
   * or delete a product.
   */
  function showOneProduct() {
    return (
      <div>
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header>

        <div class="card shadow-sm">
          <img src={product.image} class="image-fluid" width='150px' alt="product picture"></img>
          <div class="card-body">
            <p class="card-text">{product.id} <strong>{product.title}</strong> {product.price}</p>
            <p class="card-text">{product.description}</p>
            <p class="card-text">Ratings: {product.rating.count}, Rate: {product.rating.rate}</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
          <div>
            <button type="button" onClick={() => handleClick(4)}>Update Price</button>
            <button type="button" onClick={() => handleClick(5)}>Delete Product</button>
          </div>
        </div>
      </div>
    )
  }

  /*
   * This is the frontend method for getting one product by ID
   * (get request)
   */
  function getOneProduct(id) {
    setInput(id);
    fetch("http://localhost:8081/" + id)
      .then(response => response.json())
      .then(product => { setProduct(product) });
  }

  /*
   * This view shows more information about a product.
   * This is also the view where users can update a products price.
   */
  function updateView() {
    return (
      <div>
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          <h1>Update Product</h1>
          <div class="card shadow-sm">
            <img src={product.image} class="image-fluid" width='150px' alt="product picture"></img>
            <div class="card-body">
              <p class="card-text">{product.id} <strong>{product.title}</strong> {product.price}</p>
              <p class="card-text">{product.description}</p>
              <p class="card-text">Ratings: {product.rating.count}, Rate: {product.rating.rate}</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
            <div>
              <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
              <button type="button" onClick={() => updateProduct()}>Update Price</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
 * This is the frontend method for updating a product's price
 * (put request)
 */
  function updateProduct() {
    console.log(id);
    fetch(`http://localhost:8081/updateProduct/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(
        {
          "price": price
        }
      )
    })
      .then(response => response.json())
    //.then(updateThisRobot => { updateOneRobotById(updateThisRobot) });
  }

  /*
 * This view shows more information about a product.
 * This is also the view where users can update a products price.
 */
  function deleteView() {
    return (
      <div>
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          <h1>Delete Product</h1>
          <div class="card shadow-sm">
            <img src={product.image} class="image-fluid" width='150px' alt="product picture"></img>
            <div class="card-body">
              <p class="card-text">{product.id} <strong>{product.title}</strong> {product.price}</p>
              <p class="card-text">{product.description}</p>
              <p class="card-text">Ratings: {product.rating.count}, Rate: {product.rating.rate}</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
            <div>
              <button type="button" onClick={() => deleteProduct()}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * This is the frontend method for deleting a product
   * (delete request)
   */
  function deleteProduct() {
    fetch(`http://localhost:8081/deleteProduct/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(
        { "id": id }
      )
    })
      .then(response => response.json())
      .then(res => getProducts())

    setView(0);
  }

  /*
   * This view shows the form for user's to add a new product
   */
  function addProduct() {
    return (
      <div>
        {/* Header */}
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header> <br />

        <div class="col-md-7 col-lg-8">
          <form class="needs-validation" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            {/* Product Information */}
            <h4 class="mb-3">Add Product</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <div className="form-group">
                  <input {...register("id", { required: true })} placeholder="ID" className="form-control" />
                  {errors.id && <p className="text-danger">id is required.</p>}
                </div>
              </div>
              <div class="col-sm-6">
                <div className="form-group">
                  <input {...register("title", { required: true })} placeholder="Title" className="form-control" />
                  {errors.title && <p className="text-danger">Title is required.</p>}
                </div>
              </div>
            </div><br />
            <div class="row g-3">
              <div class="col-12">
                <div className="form-group">
                  <input {...register("price", { required: true })} placeholder="Price" className="form-control" />
                  {errors.price && <p className="text-danger">price is required.</p>}
                </div>
              </div>
            </div><br />
            <div class="row g-3">
              <div class="col-12">
                <div className="form-group">
                  <input {...register("description", { required: true })} placeholder="Description" className="form-control" />
                  {errors.description && <p className="text-danger">Description is required.</p>}
                </div>
              </div>
            </div><br />
            <div class="row g-3">
              <div class="col-12">
                <div className="form-group">
                  <input {...register("category", { required: true })} placeholder="Category" className="form-control" />
                  {errors.category && <p className="text-danger">Category is required.</p>}
                </div>
              </div>
            </div><br />
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group">
                  <input {...register("image", { required: true })} placeholder="Image URL" className="form-control" />
                  {errors.image && <p className="text-danger">Image is required.</p>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <input {...register("rating")} placeholder="Rating" className="form-control" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <input {...register("count")} placeholder="Count" className="form-control" />
                </div>
              </div>
            </div><br />
            {/* Submit Button */}
            <div class="row g-3">
              <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>);
  }

  /*
   * Method for when the Add Product form is submitted
   */
  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent default form submission behavior

    postProduct(data);

    // update hooks
    setDataF(data);
    setView(0);
    unregister("id");
    unregister("title");
    unregister("price");
    unregister("description");
    unregister("category");
    unregister("image");
    unregister("rating");

    setDataF({});
  };

  /*
   * Frontend method to add a product 
   * (post request)
   */
  function postProduct(data) {
    // format the product data correctly
    const productData = {
      id: parseInt(data.id),
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: parseFloat(data.rating),
        count: parseInt(data.count)
      }
    };

    fetch('http://localhost:8081/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Success:', responseData);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }

  /*
   * This view shows the about page, including information about the course, students, and assignment
   */
  function viewStudents() {
    return (
      <div>
        {/* Header */}
        <header data-bs-theme="dark">
          <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>Add Product</button>
                  </li>
                  <li class="nav-item" style={{ margin: '5px' }}>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>About</button>
                  </li>
                </ul>
                <input type="text" placeholder="Enter Product ID" onChange={(e) => getOneProduct(e.target.value)} />
                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
              </div>
            </div>
          </nav>
        </header>

        {/* Title */}
        <section>
          <h1 style={{ textAlign: 'center' }}>About</h1>
        </section>
        {/* Content */}
        <section>
          <div class="container">
            <h2>Class Information</h2>
            <p>Com S 319: Construction of User Interfaces</p>
            <p>Professor Ali Jannesari</p>
            <p>April 27, 2024</p>
          </div>
        </section>
        <section>
          <div class="container">
            <h2>Project Description</h2>
            <p class="title">Assignment 3</p>
            <p>For this assignment, our team developed a MERN
              (MongoDB, Express, React, NodeJS) application for managing
              a catalog of items. The assignment allows users to view all
              items, search one item by ID, edit an items price, delete an item, and add new items.  </p>
          </div>
        </section>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <h2>Developers:</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h3>Maddelynne McGovern</h3>
                    <p class="title">mrm4@iastate.edu</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h3>Jennifer Hua</h3>
                    <p class="title">jthua@iastate.edu</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h3>Sagnik Dey</h3>
                    <p class="title">sdey@iastate.edu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * This if/else statement sets the view.
   */
  if (view === 0) {
    return showAllProducts();
  } else if (view === 1) {
    return showOneProduct();
  } else if (view === 2) {
    return viewStudents();
  } else if (view === 3) {
    return addProduct();
  } else if (view === 4) {
    return updateView();
  } else if (view === 5) {
    return deleteView();
  } else {
    return (<div>
      <button onClick={() => handleClick(0)}>All Products</button>
      <button onClick={() => handleClick(2)}>About</button>
    </div>);
  }
}

export default Products;
