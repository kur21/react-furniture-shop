import React from 'react'
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {
	const { closeSidebar } = useProductsContext()
	const { total_items, clearCart } = useCartContext()
	const { loginWithRedirect, logout, myUser } = useUserContext()
	return (
		<Wrapper className="cart-btn-wrapper">
			<Link to="/cart" className="cart-btn" onClick={closeSidebar}>
				Cart
				<span className="cart-container">
					<FaShoppingCart />
					<span className="cart-value">{total_items}</span>
				</span>
			</Link>
			{myUser ? (
				<button
					type="button"
					className="auth-btn"
					onClick={() => {
						clearCart()
						logout({ logoutParams: { returnTo: window.location.origin } })
					}}
				>
					<div className="avatar">
						<h5>{myUser.nickname}</h5>
					</div>
				</button>
			) : (
				<button type="button" className="auth-btn" onClick={loginWithRedirect}>
					Login <FaUserPlus />
				</button>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	width: 225px;

	.avatar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		h5 {
			margin-bottom: 0;
		}
	}

	.cart-btn {
		color: var(--clr-grey-1);
		font-size: 1rem;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-1);
		display: flex;

		align-items: center;
	}
	.cart-container {
		display: flex;
		align-items: center;
		position: relative;
		svg {
			height: 1.6rem;
			margin-left: 5px;
		}
	}
	.cart-value {
		position: absolute;
		top: -8px;
		right: -14px;
		background: var(--clr-primary-5);
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 0.675rem;
		color: var(--clr-white);
	}
	.auth-btn {
		display: flex;
		align-items: center;
		background: transparent;
		border-color: transparent;
		font-size: 1rem;
		cursor: pointer;
		color: var(--clr-grey-1);
		letter-spacing: var(--spacing);
		svg {
			margin-left: 5px;
		}
	}
`
export default CartButtons
