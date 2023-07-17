import {createBrowserRouter} from "react-router-dom";
import {
  AddProductPhoto,
  Brand,
  BrandForm,
  Category,
  CategoryForm,
  Dashboard,
  Employee,
  ForgotPassword,
  Group,
  GroupForm,
  HumanResource,
  Invoice,
  Login,
  NotFound,
  Product,
  ProductAttribute,
  ProductAttributeForm,
  ProductForm,
  Profile,
  SaleManager,
  SaleManagerForm,
  Shop,
  ShopForm,
  SubCategory,
  SubCategoryForm,
  Supplier,
  SupplierForm,
  Ticket, Trash,
  UserForm,
  Users,
  Visitor,
  VisitorForm
} from "./views";
import {ProtectedLayout, PublicLayout} from "./components";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },

      {
        path: '/sales-managers',
        element: <SaleManager/>
      },
      {
        path: '/sales-managers/create',
        element: <SaleManagerForm key="create"/>
      },
      {
        path: '/sales-managers/:id',
        element: <SaleManagerForm key="update"/>
      },

      {
        path: '/suppliers',
        element: <Supplier/>
      },
      {
        path: '/suppliers/create',
        element: <SupplierForm key="create"/>
      },
      {
        path: '/suppliers/:id',
        element: <SupplierForm key="update"/>
      },

      {
        path: '/shops',
        element: <Shop/>
      },
      {
        path: '/shops/create',
        element: <ShopForm key="create"/>
      },
      {
        path: '/shops/:id',
        element: <ShopForm key="update"/>
      },

      {
        path: '/invoices',
        element: <Invoice/>
      },
      {
        path: '/tickets',
        element: <Ticket/>
      },

      {
        path: '/products',
        element: <Product/>
      },
      {
        path: '/products/photo/:id',
        element: <AddProductPhoto/>
      },
      {
        path: '/products/create',
        element: <ProductForm key="create"/>
      },
      {
        path: '/products/:id',
        element: <ProductForm key="update"/>
      },
      {
        path: '/trash',
        element: <Trash/>
      },

      {
        path: '/product-attributes',
        element: <ProductAttribute/>
      },
      {
        path: '/product-attributes/create',
        element: <ProductAttributeForm key="create"/>
      },
      {
        path: '/product-attributes/:id',
        element: <ProductAttributeForm key="update"/>
      },

      {
        path: '/brands',
        element: <Brand/>
      },
      {
        path: '/brands/create',
        element: <BrandForm key="create"/>
      },
      {
        path: '/brands/:id',
        element: <BrandForm key="update"/>
      },

      {
        path: '/categories',
        element: <Category/>
      },
      {
        path: '/categories/create',
        element: <CategoryForm key="create"/>
      },
      {
        path: '/categories/:id',
        element: <CategoryForm key="update"/>
      },

      {
        path: '/sub-categories',
        element: <SubCategory/>
      },
      {
        path: '/sub-categories/create',
        element: <SubCategoryForm key="create"/>
      },
      {
        path: '/sub-categories/:id',
        element: <SubCategoryForm key="update"/>
      },

      {
        path: '/human-resource',
        element: <HumanResource/>,
        children: []
      },
      {
        path: '/groups',
        element: <Group/>
      },
      {
        path: '/groups/create',
        element: <GroupForm key="create"/>
      },
      {
        path: '/groups/:id',
        element: <GroupForm key="update"/>
      },
      {
        path: '/employees',
        element: <Employee/>
      },

      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/create',
        element: <UserForm key="create"/>
      },
      {
        path: '/users/:id',
        element: <UserForm key="update"/>
      },

      {
        path: '/visitors',
        element: <Visitor/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/visitors/create',
        element: <VisitorForm key="create"/>
      },
      {
        path: '/visitors/:id',
        element: <VisitorForm key="update"/>
      },
    ]
  },

  {
    path: '/',
    element: <PublicLayout/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/login',
        element: <Login/>
      },

      {
        path: '/forgot-password',
        element: <ForgotPassword/>
      },
    ]
  },

  {
    path: '*',
    element: <NotFound/>
  },
])

export default router
