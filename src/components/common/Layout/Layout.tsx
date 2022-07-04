import cn from 'clsx'
import s from './Layout.module.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CommerceProvider } from '@framework'
import LoginView from '@components/auth/LoginView'
import { Navbar, Footer } from '@components/common'
import ShippingView from '@components/checkout/ShippingView'
import CartSidebarView from '@components/cart/CartSidebarView'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, LoadingDots } from '@components/base'
import PaymentMethodView from '@components/checkout/PaymentMethodView'
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView'
import { CheckoutProvider } from '@components/checkout/context'
import { MenuSidebarView } from '@components/common/UserNav'
import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'
import type { Link as LinkProps } from '../UserNav/MenuSidebarView'

import { useAppDispatch, useAppSelector } from '@lib/store'
import { selectState, uiSlice } from '@components/base/uiSlice'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
  ...dynamicProps,
})

const ForgotPassword = dynamic(() => import('@components/auth/ForgotPassword'), {
  ...dynamicProps,
})

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ...dynamicProps,
})

const Modal = dynamic(() => import('@components/base/Modal'), {
  ...dynamicProps,
  ssr: false,
})

const ModalView = ({ modalView, closeModal }: { modalView: string; closeModal: any }) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  )
}

const ModalUI = () => {
  const dispatch = useAppDispatch()
  const { displayModal, modalView } = useAppSelector(selectState)

  const closeModal = () => {
    dispatch(uiSlice.actions.closeModal())
  }

  return displayModal ? <ModalView modalView={modalView} closeModal={closeModal} /> : null
}

const SidebarView = ({
  sidebarView,
  closeSidebar,
  links,
}: {
  sidebarView: string
  closeSidebar: any
  links: LinkProps[]
}) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />}
    </Sidebar>
  )
}

const SidebarUI = ({ links }: { links: LinkProps[] }) => {
  const dispatch = useAppDispatch()
  const { displaySidebar, sidebarView } = useAppSelector(selectState)

  const closeSidebar = () => {
    dispatch(uiSlice.actions.closeSidebar())
  }

  return displaySidebar ? <SidebarView links={links} sidebarView={sidebarView} closeSidebar={closeSidebar} /> : null
}

interface Props {
  children?: React.ReactNode
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const Layout = ({ children, pageProps: { categories = [], ...pageProps } }: Props) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  const navBarlinks = categories.slice(0, 2).map(c => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <Navbar links={navBarlinks} />
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <ModalUI />
        <CheckoutProvider>
          <SidebarUI links={navBarlinks} />
        </CheckoutProvider>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
