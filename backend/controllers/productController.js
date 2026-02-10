import Product from '../models/productModel.js';
import ErrorHandler  from '../utils/handleError.js';
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';

//creating a product
export const createProducts = handleAsyncError(async (req, res,next) => {
    
        const product = await Product.create(req.body);
        res.status(201).json({success: true,product});
     
    
})


export const getAllProducts = handleAsyncError(async (req, res,next) => {
    const resultPerPage = 3;

    const apiFeatures  = new APIFunctionality(Product.find(), req.query)
    .search().filter();


    //Step 1: Get Filtered Count (Before Pagination)
    const productCount = await apiFeatures.query.clone().countDocuments();


    //Step 2: Calculate Total Pages
    const totalPages = Math.ceil(productCount / resultPerPage);

    //Step 3: Validate Page
    const page = Number(req.query.page) || 1;


    if (page > totalPages && productCount > 0) {
    return next(new ErrorHandler("Page does not exist", 404));
    }

    //Step 4: Apply Pagination AFTER Validation
    apiFeatures.pagination(resultPerPage);
    const products = await apiFeatures.query;

    if (products.length === 0) {
    return next(new ErrorHandler("No product found", 404));
    }


    res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage: page
    });
});


// update a product
export const updateProduct = handleAsyncError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    

    product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});
export const deleteProduct = handleAsyncError(async (req, res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
       return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

//Accessing a product
export const getSingleProduct = handleAsyncError(async (req, res,next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});