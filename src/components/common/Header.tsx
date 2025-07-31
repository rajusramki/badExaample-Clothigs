import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  FavoriteBorder as WishlistIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { toggleCart } from '../../store/slices/cartSlice';
import { setMobileMenu } from '../../store/slices/uiSlice';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { itemCount: cartItemCount } = useAppSelector((state) => state.cart);
  const { itemCount: wishlistItemCount } = useAppSelector((state) => state.wishlist);
  const { mobileMenuOpen } = useAppSelector((state) => state.ui);

  const [searchValue, setSearchValue] = useState('');
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseAccountMenu();
    navigate('/');
  };

  const handleCartClick = () => {
    if (isMobile) {
      navigate('/cart');
    } else {
      dispatch(toggleCart());
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Men\'s', path: '/products?category=mens' },
    { label: 'Women\'s', path: '/products?category=womens' },
    { label: 'Kids', path: '/products?category=kids' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const MobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => dispatch(setMobileMenu(false))}
    >
      <Box sx={{ width: 280, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Bad Example
          </Typography>
          <IconButton onClick={() => dispatch(setMobileMenu(false))}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => dispatch(setMobileMenu(false))}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => dispatch(setMobileMenu(true))}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'inherit',
                  mr: { xs: 0, md: 4 },
                }}
              >
                Bad Example
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {navigationItems.slice(0, 4).map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ fontWeight: 500 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Search Bar */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                bgcolor: 'grey.100',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                mx: 2,
                minWidth: 300,
              }}
            >
              <InputBase
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ flex: 1, fontSize: '0.875rem' }}
              />
              <IconButton type="submit" size="small">
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search Icon for Mobile */}
              {isMobile && (
                <IconButton color="inherit" onClick={() => navigate('/products')}>
                  <SearchIcon />
                </IconButton>
              )}

              {/* Wishlist */}
              <IconButton
                color="inherit"
                component={Link}
                to="/wishlist"
              >
                <Badge badgeContent={wishlistItemCount} color="secondary">
                  <WishlistIcon />
                </Badge>
              </IconButton>

              {/* Cart */}
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItemCount} color="secondary">
                  <CartIcon />
                </Badge>
              </IconButton>

              {/* Account */}
              {isAuthenticated ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleAccountMenu}
                  >
                    <AccountIcon />
                  </IconButton>
                  <Menu
                    anchorEl={accountMenuAnchor}
                    open={Boolean(accountMenuAnchor)}
                    onClose={handleCloseAccountMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} to="/profile" onClick={handleCloseAccountMenu}>
                      Profile
                    </MenuItem>
                    <MenuItem component={Link} to="/orders" onClick={handleCloseAccountMenu}>
                      Orders
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    size="small"
                  >
                    Login
                  </Button>
                  {!isMobile && (
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/register"
                      size="small"
                    >
                      Sign Up
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <MobileMenu />
    </>
  );
};

export default Header;