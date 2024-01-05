import '../style/globals.css';

import {
  AuthenticUser,
  BlurForSafety,
  CategoryWisedProductsStore,
  CommentPermission,
  LoggedInUserStore,
  ProductsStore,
  UserStore,
} from '@/userStore';

import BeeRawNavbar from './Components/BeeRawNavbar';
import Footer from './Components/Footer';

export default function App({ Component, pageProps }) {
  return <AuthenticUser.Provider>
    <CommentPermission.Provider>
      <LoggedInUserStore.Provider>
        <BlurForSafety.Provider>
          <ProductsStore.Provider>
            <CategoryWisedProductsStore.Provider>
              <UserStore.Provider>
                <div className='text-white bg-black'>
                  <BeeRawNavbar></BeeRawNavbar>
                  <Component {...pageProps} />
                  <Footer></Footer>
                </div>
              </UserStore.Provider>
            </CategoryWisedProductsStore.Provider>
          </ProductsStore.Provider>
        </BlurForSafety.Provider>
      </LoggedInUserStore.Provider>
    </CommentPermission.Provider>
  </AuthenticUser.Provider>
}
