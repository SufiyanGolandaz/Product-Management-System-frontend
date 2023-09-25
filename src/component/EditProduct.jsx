import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../service/product.service';

const EditProduct = () => {
  const [product,setProduct]=useState({
    id:"",
    productName:"",
    description:"",
    price:"",
    status:""
});

const navigate=useNavigate();

const {id}=useParams();
console.log(id);

useEffect(()=>{
  productService.getProductById(id)
  .then((res=>{
    setProduct(res.data);
  }))
  .catch((error)=>{
    console.log(error);
  })
},[]);

const [msg,setMsg]=useState ("");

const handleChange=(e)=>{
    const value=e.target.value
    setProduct({...product,[e.target.name]:value});
}
const ProductRegister=(e)=>{
    e.preventDefault();
    productService.editProduct(product,id).then((res)=>{
        navigate("/");
        
    }).catch((error)=>{
        console.log(error);
    })
}

return (
    <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                            Edit product
                            {
                                msg && <p className="fs-4 text-center text-success ">{msg}

                                </p>
                            }
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e)=>ProductRegister(e)}>
                                <div className="mb-3">
                                    <label>Enter Product Name</label>
                                    <input 
                                    type="text"
                                    name="productName" 
                                    className="form-control" 
                                    onChange={(e)=>handleChange(e)}
                                    value={ product.productName}/>
                                </div>
                                <div className="mb-3">
                                    <label>Enter description</label>
                                    <input 
                                    type="text"
                                    name="description" 
                                    className="form-control"
                                    onChange={(e)=>handleChange(e)} 
                                    value={product.description}/>
                                </div>
                                <div className="mb-3">
                                    <label>Enter price</label>
                                    <input 
                                    type="text"
                                    name="price" 
                                    className="form-control"
                                    onChange={(e)=>handleChange(e)}
                                    value={product.price} />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Product Status</label>
                                    <input 
                                    type="text"
                                    name="status" 
                                    className="form-control" 
                                    onChange={(e)=>handleChange(e)}
                                    value={product.status}/>
                                </div>
                                <button className="btn btn-primary col-md-12">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default EditProduct;