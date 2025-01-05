// SidebarWithHeader.jsx
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useToast,
  useColorModeValue,
  Link,
  useColorMode
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SlLogout } from 'react-icons/sl';
import { Link as RouterLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import settings from '../config/settings';
import { FaFolderTree } from 'react-icons/fa6';
import { IoPieChart } from 'react-icons/io5';
import ThemeToggle from '../components/ThemeToggle';

const SidebarWithHeader = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(settings.tokenKey);
    if (!token && window.location.pathname !== '/login') {
      navigate('/login');
      toast({ description: 'وارد حساب خود شوید', status: 'warning', position: 'bottom-left' });
    }
  }, [navigate, toast]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const logoutHandler = () => {
    localStorage.removeItem(settings.tokenKey);
    navigate('/login');
  };

  return (
    <Box
      width="100%"
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.800')}
      dir={settings.direction}
    >
      {/* Header */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        bg={useColorModeValue('teal.100', 'teal.900')}
        color="white"
        px={4}
        py={3}
        boxShadow="md"
        height="70px"
        w="full"
      >
        <HStack>
          <IconButton
            icon={<GiHamburgerMenu />}
            variant="ghost"
            color={useColorModeValue('black', 'white')}
            aria-label="Toggle Menu"
            onClick={toggleSidebar}
          />
          <Box ms={5} width="50px" color="blue.500">

            <Image src={colorMode == "light" ? "logo-light.png" : 'logo-dark.png'} />
          </Box>
          <Text color={useColorModeValue('black', 'white')} fontWeight="bold" fontSize="xl">
            {settings.appName}
          </Text>
        </HStack>
        <HStack spacing={4}>
          {/* Insert the improved ThemeToggle here */}
          <ThemeToggle />
          <IconButton
            icon={<SlLogout />}
            variant="solid"
            color={useColorModeValue('black', 'white')}
            aria-label="Logout"
            onClick={logoutHandler}
          />
        </HStack>
      </Flex>

      {/* Sidebar and Main Content */}
      <Flex>
        {/* Sidebar */}
        <Box
          as="nav"
          bg={useColorModeValue('teal.300', 'teal.700')}
          color="white"
          w={isExpanded ? '200px' : '60px'}
          transition="width 0.2s"
          minH="calc(100vh - 70px)"
          py={4}
        >
          <VStack align="stretch">
            <SidebarItem
              icon={<FaFolderTree />}
              label="موضوعات"
              to="/"
              isExpanded={isExpanded}
              isActive={location.pathname === '/'}
            />
            <SidebarItem
              icon={<IoPieChart />}
              label="آمار و آنالیز"
              to="/statistics"
              isExpanded={isExpanded}
              isActive={location.pathname === '/statistics'}
            />
            {/* Add more SidebarItem components for additional menu items */}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

const SidebarItem = ({ icon, label, to, isExpanded, isActive }) => (
  <Link
    as={RouterLink}
    to={to}
    display="flex"
    justifyContent="right"
    alignItems="center"
    py={2}
    px={4}
    bg={isActive ? 'teal.700' : 'transparent'}
    _hover={{ bg: 'teal.600' }}
  >
    <Box mx={3} fontSize="lg" as="span" mr={isExpanded ? 4 : 0}>
      {icon}
    </Box>
    {isExpanded && <Text minW="fit-content">{label}</Text>}
  </Link>
);

export default SidebarWithHeader;
