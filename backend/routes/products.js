const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      category,
      brand,
      minPrice,
      maxPrice,
      search
    } = req.query;

    let query = { status: 'active' };

    // Category filter
    if (category) query.category = category;

    // Brand filter
    if (brand) query.brand = brand;

    // Price filter
    if (minPrice || maxPrice) {
      query['price.original'] = {};
      if (minPrice) query['price.original'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.original'].$lte = parseFloat(maxPrice);
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get single product
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug')
      .populate('relatedProducts')
      .populate('crossSellProducts')
      .populate('upSellProducts');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    await product.incrementViews();

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Create product (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;