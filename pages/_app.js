import '../style/globals.css';

import { SessionProvider } from 'next-auth/react';

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
                  <SessionProvider session={pageProps.session}>
                    <BeeRawNavbar></BeeRawNavbar>
                    <Component {...pageProps} />
                    <Footer></Footer>
                  </SessionProvider>
                </div>
              </UserStore.Provider>
            </CategoryWisedProductsStore.Provider>
          </ProductsStore.Provider>
        </BlurForSafety.Provider>
      </LoggedInUserStore.Provider>
    </CommentPermission.Provider>
  </AuthenticUser.Provider>
}
