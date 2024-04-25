import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";



function Products(){
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(0);
  const [id, setInput] = useState();
  const [price, setPrice] = useState(0);

  const [dataF, setDataF] = useState("");
  const { register, handleSubmit, formState: { errors }, unregister } = useForm();
  const formRef = useRef(null);


  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent default form submission behavior

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

function handleClick(input) {
  setView(input);
};

useEffect(() => {
  fetch("http://localhost:8081/listProducts")
  .then(response => response.json())
  .then(products => {
    setProducts(products);
  })
}, []);




function getProducts(){
  fetch("http://localhost:8081/listProducts")
  .then(response => response.json())
  .then(products => {setProducts(products)});
}
  

function showAllProducts() {
  const allProducts = products.map((el) => (
    <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
        <div class="col-2">
            <img class="img-fluid" src={el.image} width='150px'/>
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
  
  return(
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
            <input type="text" placeholder="Enter Product ID"  onChange={(e) => getOneProduct(e.target.value)}/> 
            <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
          </div>
        </div>
      </nav>
    </header> 
    <h1>Products:</h1><br/>
   <div>{allProducts}</div>
    
    </div>
);
}

function getOneProduct(id){
  setInput(id);
  fetch("http://localhost:8081/" + id)
  .then(response => response.json())
  .then(product => {setProduct(product)});
}

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
            <input type="text" placeholder="Enter Product ID"  onChange={(e) => getOneProduct(e.target.value)}/> 
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
        <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e)}/>
        <button type="button" onClick={() => updateProduct()}>Update Price</button>
        </div>
        <div>
        <button type="button" onClick={() => deleteProduct()}>Delete Product</button>
        </div>
    </div> 
    </div>
    )
  }
  
  function deleteProduct() {
    fetch(`http://localhost:8081/deleteProduct/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(
        { "id":id}
      )
    })
    .then(response => response.json())
    .then(res => getProducts())
    
    setView(0);
}


function addProduct(){
  return(
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
         <input type="text" placeholder="Enter Product ID"  onChange={(e) => getOneProduct(e.target.value)}/> 
         <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Product</button>
       </div>
     </div>
   </nav>
 </header> <br/>


  <div class="col-md-7 col-lg-8">
  <form class="needs-validation"  ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
      </div><br/>
      <div class="row g-3">
          <div class="col-12">
              <div className="form-group">
                  <input {...register("price", { required: true })} placeholder="Price" className="form-control" />
                  {errors.price && <p className="text-danger">price is required.</p>}
              </div>
          </div>
      </div><br/>
      <div class="row g-3">
          <div class="col-12">
              <div className="form-group">
                  <input {...register("description", { required: true })} placeholder="Description" className="form-control" />
                  {errors.description && <p className="text-danger">Description is required.</p>}
              </div>
          </div>
      </div><br/>
      <div class="row g-3">
          <div class="col-12">
              <div className="form-group">
                  <input {...register("category", {required: true})} placeholder="Category" className="form-control" />
                  {errors.category && <p className="text-danger">Category is required.</p>}
              </div>
          </div>
      </div><br/>
      <div class="row g-3">
          <div class="col-md-5">
              <div className="form-group">
                  <input {...register("image", { required: true })} placeholder="Image URL" className="form-control" />
                  {errors.image && <p className="text-danger">Image is required.</p>}
              </div>
          </div><br/>
          <div class="col-md-4">
              <div className="form-group">
                  <input {...register("rating")} placeholder="Rating" className="form-control" />
              </div>
          </div>
      </div><br/>

      {/* Submit Button */}
      <div class="row g-3">
          <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
      </div>
  </form>
</div>
</div>);



}


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
            <input type="text" placeholder="Enter Product ID"  onChange={(e) => getOneProduct(e.target.value)}/> 
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
                  {/* TODO add description */}
                  <p>Description goes here</p>
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
                                  <p class="card-text">I am a senior double majoring in computer science and political science at Iowa State University.</p>
                              </div>
                          </div>
                      </div>

                      <div class="col">
                          <div class="card shadow-sm">
                              <div class="card-body">
                                  <h3>Jennifer Hua</h3>
                                  <p class="title">jthua@iastate.edu</p>
                                  <p class="card-text">I am a sophomore majoring in Computer Science and minoring in Cyber Security at Iowa State University.</p>
                              </div>
                          </div>
                      </div>

                      <div class="col">
                          <div class="card shadow-sm">
                              <div class="card-body">
                                  <h3>Sagnik Dey</h3>
                                  <p class="title">sdey@iastate.edu</p>
                                  {/* TODO add description */}
                                  <p class="card-text">Description</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}


if (view == 0) {
  return showAllProducts();
} else if (view == 1) {
  return showOneProduct();
} 
else if (view == 2) {
  return viewStudents();
} else if (view == 3) {
  return addProduct();
}
else {
  return (<div>
    <button onClick={() => handleClick(0)}>All Products</button>
    <button onClick={() => handleClick(2)}>About</button>
  </div>);
}
}

export default Products;
