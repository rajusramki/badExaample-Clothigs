const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true
  },
  price: {
    original: {
      type: Number,
      required: [true, 'Original price is required'],
      min: [0, 'Price cannot be negative']
    },
    sale: {
      type: Number,
      min: [0, 'Sale price cannot be negative']
    },
    cost: {
      type: Number,
      min: [0, 'Cost cannot be negative']
    }
  },
  inventory: {
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    },
    trackStock: {
      type: Boolean,
      default: true
    },
    allowBackorder: {
      type: Boolean,
      default: false
    }
  },
  variants: [{
    name: String, // e.g., "Color", "Size"
    options: [{
      value: String, // e.g., "Red", "XL"
      price: Number,
      stock: Number,
      sku: String,
      images: [String]
    }]
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  specifications: [{
    name: String,
    value: String
  }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: {
      type: String,
      enum: ['cm', 'in', 'kg', 'lb'],
      default: 'cm'
    }
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingClass: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft', 'discontinued'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  reviews: {
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    ratingDistribution: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Number,
      default: 0
    },
    wishlistCount: {
      type: Number,
      default: 0
    },
    cartAdditions: {
      type: Number,
      default: 0
    }
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  crossSellProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  upSellProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ 'price.original': 1 });
productSchema.index({ 'reviews.averageRating': -1 });
productSchema.index({ featured: 1, status: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ tags: 1 });

// Virtual for current price (sale price if available, otherwise original price)
productSchema.virtual('currentPrice').get(function() {
  return this.price.sale && this.price.sale > 0 ? this.price.sale : this.price.original;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.price.sale && this.price.sale > 0 && this.price.sale < this.price.original) {
    return Math.round(((this.price.original - this.price.sale) / this.price.original) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (!this.inventory.trackStock) return 'in-stock';
  if (this.inventory.stock <= 0) {
    return this.inventory.allowBackorder ? 'backorder' : 'out-of-stock';
  }
  if (this.inventory.stock <= this.inventory.lowStockThreshold) {
    return 'low-stock';
  }
  return 'in-stock';
});

// Virtual for main image
productSchema.virtual('mainImage').get(function() {
  const mainImg = this.images.find(img => img.isMain);
  return mainImg ? mainImg.url : (this.images.length > 0 ? this.images[0].url : null);
});

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Ensure only one main image
productSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    const mainImages = this.images.filter(img => img.isMain);
    if (mainImages.length > 1) {
      // Set only the first one as main
      this.images.forEach((img, index) => {
        img.isMain = index === 0;
      });
    } else if (mainImages.length === 0) {
      // Set first image as main if none is set
      this.images[0].isMain = true;
    }
  }
  next();
});

// Update analytics on view
productSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);