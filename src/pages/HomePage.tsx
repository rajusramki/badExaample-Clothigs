import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward, LocalOffer, ShoppingBag, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFeaturedProducts } from '../store/slices/productSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { featuredProducts, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const categories = [
    {
      title: "Men's Fashion",
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400',
      link: '/products?category=mens',
      description: 'Discover the latest trends'
    },
    {
      title: "Women's Fashion",
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      link: '/products?category=womens',
      description: 'Express your unique style'
    },
    {
      title: "Kids Fashion",
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400',
      link: '/products?category=kids',
      description: 'Comfort meets style'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #fff 30%, #ff6b35 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bad Example Clothing
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  opacity: 0.9,
                  fontWeight: 400,
                }}
              >
                Fashion that breaks the rules and sets new standards
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, opacity: 0.8, maxWidth: 500 }}
              >
                Discover our curated collection of premium clothing that combines 
                comfort, style, and authenticity. Express yourself with confidence.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/products"
                  endIcon={<ShoppingBag />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={Link}
                  to="/about"
                  endIcon={<ArrowForward />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'linear-gradient(45deg, #ff6b35, #ff8c65)',
                    borderRadius: 3,
                    zIndex: -1,
                    opacity: 0.1,
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
                  alt="Fashion Collection"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: theme.spacing(2),
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Shop by Category
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Explore our diverse collection of clothing designed for every occasion and style preference
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={Link}
                to={category.link}
                sx={{
                  textDecoration: 'none',
                  height: 400,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={category.image}
                  alt={category.title}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>
                Featured Products
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Hand-picked items from our latest collection
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForward />}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <LoadingSpinner message="Loading featured products..." />
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card
                    component={Link}
                    to={`/products/${product.slug}`}
                    sx={{
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.mainImage || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.brand}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${product.currentPrice}
                          </Typography>
                          {product.discountPercentage > 0 && (
                            <Chip
                              label={`-${product.discountPercentage}%`}
                              color="secondary"
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ textAlign: 'center', mt: 4, display: { xs: 'block', md: 'none' } }}>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              endIcon={<ArrowForward />}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} textAlign="center">
            <LocalOffer sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Best Prices
            </Typography>
            <Typography color="text.secondary">
              Competitive pricing with frequent sales and exclusive member discounts
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <ShoppingBag sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Fast Delivery
            </Typography>
            <Typography color="text.secondary">
              Quick and reliable shipping with tracking on all orders
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Favorite sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Quality Guaranteed
            </Typography>
            <Typography color="text.secondary">
              Premium materials and craftsmanship with satisfaction guarantee
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;