import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import useCart from '@framework/cart/use-cart'
import { Heart, Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'
import { Dropdown, DropdownTrigger as DropdownTriggerInst, Button } from '@components/base'

import type { LineItem } from '@commerce/types/cart'

import { useAppDispatch, useAppSelector } from '@lib/store'
import { selectState, uiSlice } from '@components/base/uiSlice'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const dispatch = useAppDispatch()
  const { displaySidebar } = useAppSelector(selectState)

  const openModal = () => {
    dispatch(uiSlice.actions.openModal())
  }

  const setSidebarView = (view: string) => {
    dispatch(uiSlice.actions.setSidebarView({ view }))
  }

  const openSidebar = () => {
    dispatch(uiSlice.actions.openSidebar())
  }

  // const toggleSidebar = () => {
  //   displaySidebar ? dispatch(uiSlice.actions.closeSidebar()) : dispatch(uiSlice.actions.openSidebar())
  // }

  const closeSidebarIfPresent = () => {
    displaySidebar && dispatch(uiSlice.actions.closeSidebar())
  }

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn ? DropdownTriggerInst : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                openSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            <Dropdown>
              <DropdownTrigger>
                <button
                  aria-label="Menu"
                  className={s.avatarButton}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  <Avatar />
                </button>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILE_MENU_VIEW')
              openSidebar()
            }}
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
